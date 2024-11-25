import {Component, OnInit} from '@angular/core';
import {
  DefaultRegisterLayoutComponent
} from '../../components/default-register-layout/default-register-layout.component';
import {Router} from '@angular/router';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiEndpointsService} from '../../services/api-endpoints.service';
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule,
    DefaultRegisterLayoutComponent,
    PrimaryInputComponent,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {
  public title: string = "Register";
  public primaryBtnText: string = "Save";
  public registerForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiEndpoints: ApiEndpointsService,
    private httpClient: HttpClient,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Synchronous validators in an array
      username: ['', [Validators.required, Validators.minLength(6)]], // Synchronous validators in an array
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.registerForm.markAllAsTouched();
  }


  public onNavigate() {
    this.router.navigate(['login']);
  }


  public onSubmit(): void {
    let name: string = this.registerForm.value.name
    if (this.registerForm.valid) {
      this.httpClient.post(
        this.apiEndpoints.endpoints.registerUser,
        this.registerForm.getRawValue()
      ).subscribe({
        next: (data: any) => {
          this.toastr.success(
            `Register successifuly, ${name}!`
          )
          this.router.navigate(['login']);
        },
        error: () => {
          this.toastr.error(
            'Sorry, something went wrong. Please try again.'
          )
        }
      })
    } else {
      this.toastr.error(
        'Sorry, Invalid form. Please try again.'
      )
    }
  }
}
