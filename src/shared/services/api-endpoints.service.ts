import {Injectable} from '@angular/core';
import {URLS} from '../urls';

@Injectable({
  providedIn: 'root',
})
export class ApiEndpointsService {

  public readonly endpoints = {
    // Usuários
    registerUser: URLS.BASE + URLS.REGISTER,
    loginUser: URLS.BASE + URLS.LOGIN,
    logoutUser: URLS.BASE + URLS.LOGOUT,
    usersProfile: URLS.BASE + URLS.USERS,
    usersProfileById: (id: number) => URLS.BASE + URLS.USERS + id + '/',

    // Game Cards
    getGameCards: URLS.BASE + URLS.GAME_CARD,
    getGameCardById: (id: number) => URLS.BASE + URLS.GAME_CARD + id + '/',

    // Ranking
    getRankUsers: URLS.BASE + URLS.RANKUSER,
    getRankUsersById: (id: number) => URLS.BASE + URLS.RANKUSER + id + '/',

  };

  constructor() {
  }
}
