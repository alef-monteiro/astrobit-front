import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { ApiEndpointsService } from './api-endpoints.service';

// Interfaces para os dados
export interface GameCardData {
  id?: number;// ID opcional para ser usado em operações de update ou delete
  game_title: string;
  author_name: string;
  description: string;
  link: string;
  image: string;
  active: boolean
}

export interface GameCardListResponse {
  results: GameCardData[]; // Assumindo que o backend retorna uma lista em um campo chamado `results`
}

@Injectable({
  providedIn: 'root',
})

export class GamecardDataService {
  constructor(
    private httpClient: HttpClient,
    private apiEndpoints: ApiEndpointsService
  ) {
  }

  /**
   * Recupera a lista de GameCards cadastrados
   */
  public getGameCards(): Observable<GameCardData[]> {
    return this.httpClient.get<GameCardData[]>(this.apiEndpoints.endpoints.getGameCards, {withCredentials: true});
  }

  public getGameCardById(id: number): Observable<GameCardData> {
    return this.httpClient.get<GameCardData>(`${this.apiEndpoints.endpoints.getGameCards}/${id}`);
  }


  /**
   * Cria um novo GameCard
   * @param data Dados do GameCard
   */
  public createGameCard(data: GameCardData): Observable<GameCardData> {
    return this.httpClient.post<GameCardData>(this.apiEndpoints.endpoints.getGameCards, data);
  }

  /**
   * Atualiza um GameCard existente
   * @param id ID do GameCard
   * @param data Dados atualizados do GameCard
   */
  public updateGameCard(id: number, data: GameCardData): Observable<GameCardData> {
    return this.httpClient.put<GameCardData>(`${this.apiEndpoints.endpoints.getGameCards}/${id}`, data);
  }

  /**
   * Deleta um GameCard específico
   * @param id ID do GameCard
   */
  public deleteGameCard(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiEndpoints.endpoints.getGameCards}/${id}`);
  }
}
