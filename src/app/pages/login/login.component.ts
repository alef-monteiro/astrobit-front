import {Component, Output} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/default-login-layout/default-login-layout.component';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {ToastrService} from 'ngx-toastr';
import {SharedModule} from '../../../shared/shared.module';
import {LoginDataService} from '../../../shared/services/login-data.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    DefaultLoginLayoutComponent,
    PrimaryInputComponent,
    NgIf
  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm!: FormGroup;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginDataService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]], // Synchronous validators in an array
      // email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }


  public onNavigate() {
    this.router.navigate(['register']);
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: () => {
          const user = this.loginService.user;
          if (user) {
            this.toastr.info(`Login successfully, ${user.username}!`)
            this.toastr.success(`Welcome, ${user.name}!`)
            this.router.navigate(['homepage']);
          } else {
            this.toastr.error(`Login fail!`);
          }
        },
        error: (err) => {
          console.error('Error', err);
        },
      });
    } else {
      this.toastr.error(
        'Sorry, Invalid form. Please try again.'
      )
    }
  }

}



