import {Component} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/default-login-layout/default-login-layout.component';
import {Router, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {LoginService} from '../../services/login.service';
import {ToastrService} from 'ngx-toastr';

interface SignupForm {
  username: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    RouterOutlet,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService,
    ToastrService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class LoginComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private signupService: LoginService,
    private toastrService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl("", [Validators.required, Validators.minLength(6)])
    })

  }

  //Mudança e criação de serviço
  submit() {
    // console.log(this.signupForm.valid)
    this.signupService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => this.toastrService.success("Login succesfully"),
      error: () => this.toastrService.error("Sorry, something went wrong.\nTry again later.")
    })
  }

  navigate() {
    this.router.navigate(['signup'])
  }

}
