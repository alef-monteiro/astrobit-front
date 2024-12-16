import {Injectable} from '@angular/core';
import {URLS} from '../urls';

@Injectable({
  providedIn: 'root',
})
export class ApiEndpointsService {
  private baseUrl: string = 'http://localhost:8000/api/';

  public readonly endpoints = {
    // Usuários
    registerUser: `${this.baseUrl}register/`,
    loginUser: `${this.baseUrl}token/`,
    logoutUser: `${this.baseUrl}logout/`,
    usersProfile: `${this.baseUrl}users/`,
    // Game Cards
    getGameCards: this.baseUrl + URLS.GAME_CARD,
    getGameCardById: (id: number) => this.baseUrl + URLS.GAME_CARD + id + '/',

    // Ranking
    rankUsers: this.baseUrl + URLS.RANKUSER,
  };

  constructor() {
  }
}
