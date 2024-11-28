import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndpointsService} from './api-endpoints.service';
import {tap} from 'rxjs';
import {jwtDecode} from 'jwt-decode';


interface User {
  id: string;
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
export class LoginDataService {

  constructor(
    private httpClient: HttpClient,
    private endPointService: ApiEndpointsService) {
  }

  public login(username: string, password: string) {
    return this.httpClient.post<LoginResponse>
    (this.endPointService.endpoints.loginUser,
      {username, password},
      {withCredentials: true})
      .pipe(
        tap((value) => {
            sessionStorage.setItem('auth-token', value.access)
            sessionStorage.setItem('refresh', value.refresh)
            console.log('Token salvo:', value.access);

          }
        )
      )
  }


  get user(): User | null {
    const token = sessionStorage.getItem('auth-token');
    if(!token){
      return null;
    }
    const payload = jwtDecode<User>(token);
    const user = payload as User;

    return user ? user : null;
  }
}
