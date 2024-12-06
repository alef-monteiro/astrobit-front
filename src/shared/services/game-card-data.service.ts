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
    const url = this.apiEndpoints.endpoints.getGameCards + id+'/';
    return this.httpClient.get<Card>(url);
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
