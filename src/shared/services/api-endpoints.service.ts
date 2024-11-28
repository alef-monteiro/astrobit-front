import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiEndpointsService {

  // Base URL da API (ajuste conforme necessário)
  private baseUrl: string = 'http://localhost:8000/api/';

  // Endpoints específicos da API
  public readonly endpoints = {
    // Usuários
    registerUser: `${this.baseUrl}register/`, // Endpoint para registro de usuário
    loginUser: `${this.baseUrl}token/`, // Ajuste caso esteja utilizando JWT ou outro metodo
    logoutUser: `${this.baseUrl}logout/`, // Ajuste conforme o metodo de autenticação
    getUserById: (userId: number) => `${this.baseUrl}users/${userId}/`, // Para obter um usuário específico
    // Assuntos
    getSubjects: `${this.baseUrl}subjects/`,
    getSubjectById: (id: number) => `${this.baseUrl}subjects/${id}/`,

    // Questões
    getQuestionsBySubject: (subjectId: number) => `${this.baseUrl}questions/?subject=${subjectId}`, // Ajustado para passar via query params (se necessário)

    // Pontuação
    getUserScores: (userId: number) => `${this.baseUrl}scores/user/${userId}/`,
    postUserScore: `${this.baseUrl}scores/`,
  };

  constructor() {
  }
}
