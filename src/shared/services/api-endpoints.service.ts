import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiEndpointsService {
  private baseUrl: string = 'http://localhost:8000/api/';
  private baseUrlCards: string = 'http://localhost:8000/gamecards/';

  public readonly endpoints = {

    // Usuários
    registerUser: `${this.baseUrl}register/`, // Endpoint para registro de usuário
    loginUser: `${this.baseUrl}token/`, // Ajuste caso esteja utilizando JWT ou outro metodo
    logoutUser: `${this.baseUrl}logout/`, // Ajuste conforme o metodo de autenticação
    getUserById: (userId: number) => `${this.baseUrl}users/${userId}/`, // Para obter um usuário específico

    // Pontuação
    getUserScores: (userId: number) => `${this.baseUrl}scores/user/${userId}/`,
    postUserScore: `${this.baseUrl}scores/`,

    // Game Cards
    getGameCards: `${this.baseUrlCards}`, // Lista de cartões de jogo
    getGameCardById: (id: number) => `${this.baseUrlCards}gamecards/${id}/`, // Cartão de jogo específico
    rankUsers: `${this.baseUrl}rankusers/`, // Ranking de usuários
  };

  constructor() {}
}
