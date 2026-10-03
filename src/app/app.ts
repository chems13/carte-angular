import { Component, signal } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-item';
import { RouterOutlet } from '@angular/router';
import { SearchBar } from './components/search-bar/search-bar';



@Component({
  selector: 'app-root',
  templateUrl:'./app.html',
  styleUrl:'./app.css',
  imports: [CollectionItemCard, SearchBar]

})
export class App {

  coin!: CollectionItem;
  linx!: CollectionItem;
   
  constructor() {
    this.coin = new CollectionItem();
    this.coin.name='Piece de 1972';
    this.coin.description='pieces de 50 centimes en or.';
    this.coin.rarety = 'Commune';
    this.coin.image = 'img/poke1.jpg';
    this.coin.prace = 170;
  
    this.linx = new CollectionItem();
  }
}