import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { ApiEndpointsService } from './api-endpoints.service';
import {Card} from '../models/card';


export interface GameCardListResponse {
  results: Card[]; // Assumindo que o backend retorna uma lista em um campo chamado `results`
}


@Injectable({
  providedIn: 'root',
})

export class GameCardDataService {
  constructor(
    private httpClient: HttpClient,
    private apiEndpoints: ApiEndpointsService
  ) {
  }

  /**
   * Recupera a lista de GameCards cadastrados
   */
  public getGameCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(this.apiEndpoints.endpoints.getGameCards, {withCredentials: true});
  }

  public getGameCardById(id: number): Observable<Card> {
    return this.httpClient.get<Card>
    (`${this.apiEndpoints.endpoints.getGameCards}/${id}`).pipe(
      tap((value) => {
        console.log('Dados gamecard:', value);


        // Armazene o token no sessionStorage
        sessionStorage.setItem('game-title', value.game_title);
        sessionStorage.setItem('author_name', value.author_name);
        sessionStorage.setItem('description', value.description);
        sessionStorage.setItem('link', value.link);
        sessionStorage.setItem('image', value.image);

      })
    );
  }


  /**
   * Cria um novo GameCard
   * @param data Dados do GameCard
   */
  public createGameCard(data: Card): Observable<Card> {
    return this.httpClient.post<Card>(this.apiEndpoints.endpoints.getGameCards, data);
  }

  /**
   * Atualiza um GameCard existente
   * @param id ID do GameCard
   * @param data Dados atualizados do GameCard
   */
  public updateGameCard(id: number, data: Card): Observable<Card> {
    return this.httpClient.put<Card>(`${this.apiEndpoints.endpoints.getGameCards}/${id}`, data);
  }

  /**
   * Deleta um GameCard específico
   * @param id ID do GameCard
   */
  public deleteGameCard(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiEndpoints.endpoints.getGameCards}/${id}`);
  }

}
