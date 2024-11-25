import {Component} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/default-login-layout/default-login-layout.component';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {ToastrService} from 'ngx-toastr';
import {SharedModule} from '../../../shared/shared.module';
import {ApiEndpointsService} from '../../services/api-endpoints.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    DefaultLoginLayoutComponent,
    PrimaryInputComponent
  ],
  providers: [
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiEndpoints: ApiEndpointsService,
    private toastr: ToastrService,
    private httptClient: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  public onNavigate() {
    this.router.navigate(['register']);
  }

  public onSubmit() {
  console.log(this.loginForm.getRawValue())
  }


}
