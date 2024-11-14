import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {LoginResponse} from '../type/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string) {
    return this.httpClient.post <LoginResponse>("login", {email, password}).pipe(
      tap(value => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("name", value.name)
        sessionStorage.setItem("username", value.username)
        sessionStorage.setItem("avatar", value.avatar)
      })
    )
  }

}
