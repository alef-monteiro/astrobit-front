import {Component} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/default-login-layout/default-login-layout.component';
import {Router} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {LoginService} from '../../services/login.service';
import {ToastrService} from 'ngx-toastr';

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    })

  }

  submit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: () => {
          this.toastrService.success("Login succesfully")
          this.router.navigate(['homepage'])
        },
        error: () => {
          // remover o navigate depois de ajustado
          this.toastrService.error("Error sending data, please try again later.")
          this.router.navigate(['homepage'])
        }
      })
    } else {
      this.toastrService.error("Error, sorry. Try to check your data.")
    }

  }

  navigate() {
    this.router.navigate(['signup'])
  }

}
