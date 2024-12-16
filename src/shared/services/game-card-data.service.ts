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


  public getGameCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(
      this.apiEndpoints.endpoints.getGameCards,
      {headers: this.headers, withCredentials: true}
    );
  }


  public getGameCardById(id: number): Observable<Card> {
    const url = this.apiEndpoints.endpoints.getGameCardById(id);
    return this.httpClient.get<Card>(url, {headers: this.headers, withCredentials: true});
  }


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


  public updateGameCard(id: number, data: Card): Observable<Card> {
    return this.httpClient.put<Card>(
      this.apiEndpoints.endpoints.getGameCardById(id),
      data,
      {headers: this.headers, withCredentials: true}
    );
  }

  public deleteGameCard(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiEndpoints.endpoints.getGameCardById(id),
      {headers: this.headers, withCredentials: true}
    );
  }
}
