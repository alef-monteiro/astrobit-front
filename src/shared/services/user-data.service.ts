import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndpointsService} from './api-endpoints.service';
import {tap} from 'rxjs';
import {jwtDecode} from 'jwt-decode';


interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private httpClient: HttpClient,
    private apiEndPoints: ApiEndpointsService) {
  }


  public register(name: string, username: string, email: string, password: string) {
    return this.httpClient.post(
      this.apiEndPoints.endpoints.registerUser,
      {name, username, email, password}
    )
  }


  // Seguinte, tem que fazer umas lógicas de tratamento de erro aqui ainda
  public login(username: string, password: string) {
    return this.httpClient.post<LoginResponse>(
      this.apiEndPoints.endpoints.loginUser,
      {username, password},
      {withCredentials: true}
    ).pipe(
      tap((value) => {
        console.log('Token recebido:', value.access);

        // Armazene o token no sessionStorage
        sessionStorage.setItem('auth-token', value.access);
        sessionStorage.setItem('refresh', value.refresh);
      })
    );
  }

  get user(): User | null {
    const token = sessionStorage.getItem('auth-token');

    if (!token) {
      console.warn('Nenhum token encontrado no armazenamento.');
      return null;
    }

    try {
      const payload = jwtDecode<any>(token);

      if (!payload.id || !payload.name || !payload.username || !payload.email) {
        console.error('Token JWT não contém as informações esperadas:', payload);
        return null;
      }

      return {
        id: payload.id,
        name: payload.name,
        username: payload.username,
        email: payload.email,
      };
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }



  public logout():
    void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('refresh');
    console.log('Usuário desconectado.');
  }
}
