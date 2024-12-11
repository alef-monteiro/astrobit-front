import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { ApiEndpointsService } from './api-endpoints.service';
import {Card} from '../models/card';


@Injectable({
  providedIn: 'root',
})

export class GameCardDataService {
  constructor(
    private httpClient: HttpClient,
    private apiEndpoints: ApiEndpointsService
  ) {}

  public getGameCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(this.apiEndpoints.endpoints.getGameCards, {withCredentials: true});
  }

  public getGameCardById(id: number): Observable<Card> {
    const url = this.apiEndpoints.endpoints.getGameCards + id+'/';
    return this.httpClient.get<Card>(url);
  }

  public createGameCard(data: Card): Observable<Card> {
    return this.httpClient.post<Card>(this.apiEndpoints.endpoints.getGameCards, data, {withCredentials: true});
  }

  public updateGameCard(id: number, data: Card): Observable<Card> {
    return this.httpClient.put<Card>(`${this.apiEndpoints.endpoints.getGameCards}/${id}`, data);
  }

  public deleteGameCard(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiEndpoints.endpoints.getGameCards}/${id}`);
  }

}
