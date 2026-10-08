import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: environment.apiKey });

  async generateCollectionItem(prompt: string): Promise<any> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: prompt,
        config: {
          responseMimeType: 'application/json', // Force le retour JSON
        }
      });

      const text = response.text ?? '{}';
      return JSON.parse(text); // Convertit la chaîne en objet JavaScript
    } catch (error) {
      console.error('Erreur API Gemini :', error);
      throw error;
    }
  }
}