import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiEndpointsService} from './api-endpoints.service';
import {Card} from '../models/card';
import {UserDataService} from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class GameCardDataService {
  constructor(
    private httpClient: HttpClient,
    private apiEndpoints: ApiEndpointsService,
    private userService: UserDataService,
  ) {
  }

  get headers(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json', // Adiciona o token CSRF aos cabeçalhos
    });
    if (token) {
      headers = headers.append('Authorization', 'Bearer '.concat(token));
    }
    return headers;
  }


  /**
   * Recupera a lista de GameCards cadastrados.
   * @returns Observable com a lista de GameCards.
   */
  public getGameCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(
      this.apiEndpoints.endpoints.getGameCards,
      {headers: this.headers, withCredentials: true}
    );
  }

  /**
   * Recupera um GameCard específico pelo ID.
   * @param id - Identificador do GameCard.
   * @returns Observable com o GameCard correspondente.
   */
  public getGameCardById(id: number): Observable<Card> {
    const url = this.apiEndpoints.endpoints.getGameCardById(id);
    return this.httpClient.get<Card>(url, {headers: this.headers, withCredentials: true} );
  }

  /**
   * Cria um novo GameCard.
   * @param data - Dados do GameCard a ser criado.
   * @returns Observable com o GameCard criado.
   */
  public createGameCard(data: Card): Observable<Card> {
    const currentUser = this.userService.user;  // Pega o usuário logado

    if (!currentUser) {
      throw new Error('Usuário não está autenticado');
    }
    return this.httpClient.post<Card>(
      this.apiEndpoints.endpoints.getGameCards,
      data,
      {headers: this.headers, withCredentials: true}  // Garante que o JWT seja enviado
    );
  }

  /**
   * Atualiza um GameCard existente.
   * @param id - Identificador do GameCard.
   * @param data - Dados atualizados do GameCard.
   * @returns Observable com o GameCard atualizado.
   */
  public updateGameCard(id: number, data: Card): Observable<Card> {
    return this.httpClient.put<Card>(
      this.apiEndpoints.endpoints.getGameCardById(id),
      data,
      {headers: this.headers, withCredentials: true}
    );
  }

  /**
   * Remove um GameCard existente.
   * @param id - Identificador do GameCard.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  public deleteGameCard(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiEndpoints.endpoints.getGameCardById(id),
      {headers: this.headers, withCredentials: true}
    );
  }
}
