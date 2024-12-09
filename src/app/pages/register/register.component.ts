import {Component, OnInit} from '@angular/core';
import {
  DefaultRegisterLayoutComponent
} from '../../components/default-register-layout/default-register-layout.component';
import {Router} from '@angular/router';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {UserDataService} from '../../../shared/services/user-data.service';

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
    private registerService: UserDataService,
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
    let nameUser: string = this.registerForm.value.name
    if (this.registerForm.valid) {
      this.registerService.register(
        this.registerForm.value.name,
        this.registerForm.value.username,
        this.registerForm.value.email,
        this.registerForm.value.password
      ).subscribe({
        next: () => {
          this.toastr.success(
            `Registered successifuly, ${nameUser}!`
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
