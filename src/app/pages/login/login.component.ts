import {Component, OnInit} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/default-login-layout/default-login-layout.component';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {ToastrService} from 'ngx-toastr';
import {SharedModule} from '../../../shared/shared.module';
import {UserDataService} from '../../../shared/services/user-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    DefaultLoginLayoutComponent,
    PrimaryInputComponent,
  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public loading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    public loginService: UserDataService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]], // Synchronous validators in an array
       password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit() {
    this.loginForm.markAllAsTouched();
  }

  public onNavigate() {
    this.router.navigate(['register']).then();
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: () => {
          const user = this.loginService.user;
          if (user) {
            this.toastr.info(`Login com sucesso, ${user.username}!`)
            this.toastr.success(`Bem-vindo, ${user.name}!`)
            this.router.navigate(['game']).then();
          } else {
            this.loading = false
            this.toastr.error(`Problemas ao fazer login. Tente novamente.`);
          }
          this.loading = false
        },
        error: (err) => {
          this.loading = false
          console.error('Error', err);
          this.toastr.error(`Erro inesperado! Tente novamente mais tarde.`);
        },

      });
    } else {
      this.loading = false
      this.toastr.error(
        'Sorry, Invalid form. Please try again.'
      )
    }
  }

}



