  import { Component, inject, signal } from '@angular/core';
  import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
  import { CollectionItem } from './models/collection-item';
  import { SearchBar } from './components/search-bar/search-bar';
  import { FormsModule } from '@angular/forms';
  import { GeminiService } from './services/gemini';
  import { MarkdownComponent } from 'ngx-markdown';
  
  

  @Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.css',
    imports: [CollectionItemCard, SearchBar, FormsModule, MarkdownComponent]
  })
  export class App {
      private geminiService = inject(GeminiService);

      searchText = '';
      count = 0;

      coin!: CollectionItem;
      linx!: CollectionItem;

      userPrompt = '';
      aiResponse = signal('');
      isLoading = signal(false);

      constructor() {
        this.coin = new CollectionItem();
        this.coin.name = 'Pièce de 1972';
        this.coin.description = 'Pièce de 50 centimes en or.';
        this.coin.rarety = 'Commune';
        this.coin.image = 'img/poke1.jpg';
        this.coin.prace = 170;

        this.linx = new CollectionItem();
      }

      increamentCount() {
        this.count++;
      }







      async askGemini() {
        if (!this.userPrompt.trim()) return;

        this.isLoading.set(true);
        this.aiResponse.set('');

        try {
          const fullPrompt = `${this.userPrompt}. Génère un objet JSON strict avec les clés : name (string), description (string), rarety (string), prace (number).`;
          
          const itemData = await this.geminiService.generateCollectionItem(fullPrompt);

          this.linx = new CollectionItem();
          this.linx.name = itemData.name;
          this.linx.description = itemData.description;
          this.linx.rarety = itemData.rarety;
          this.linx.prace = itemData.prace ?? itemData.price ?? 100;
          this.linx.image = 'img/poke1.jpg';

          this.aiResponse.set(`Carte "${itemData.name}" créée avec succès !`);

        } catch (error: any) {
          console.error('Erreur lors de la création de la carte :', error);

          // Message personnalisé si les serveurs Google sont surchargés
          if (error?.status === 503 || error?.message?.includes('503')) {
            this.aiResponse.set('Les serveurs de Google sont momentanément surchargés. Réessaie dans quelques secondes.');
          } else {
            this.aiResponse.set('Erreur lors de la génération de la carte.');
          }
        } finally {
          this.isLoading.set(false);
        }
    }
  }