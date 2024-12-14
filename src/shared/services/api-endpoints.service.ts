import {Injectable} from '@angular/core';
import {URLS} from '../urls';

@Injectable({
  providedIn: 'root',
})
export class ApiEndpointsService {
  private baseUrl: string = 'http://localhost:8000/api/';

  public readonly endpoints = {
    // Usuários
    registerUser: `${this.baseUrl}register/`, // Endpoint para registro de usuário
    loginUser: `${this.baseUrl}token/`, // Endpoint para obtenção de token (JWT)
    logoutUser: `${this.baseUrl}logout/`, // Endpoint para logout do usuário
    updateUserProfile: `${this.baseUrl}profile/`, // Atualizar perfil do usuário

    // Reset de senha
    requestPasswordReset: `${this.baseUrl}reset/`, // Solicitação de reset de senha
    confirmPasswordReset: `${this.baseUrl}confirmreset/`, // Confirmação de reset de senha

    // Game Cards
    getGameCards: this.baseUrl + URLS.GAME_CARD, // Lista de cartões de jogo
    getGameCardById: (id: number) => this.baseUrl + URLS.GAME_CARD + id + '/', // Cartão de jogo específico

    // Ranking
    rankUsers: `${this.baseUrl}rankusers/`, // Ranking de usuários
  };

  constructor() {
  }
}
