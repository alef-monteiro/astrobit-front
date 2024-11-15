import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {ToastrService} from 'ngx-toastr';
import {DefaultSignupLayoutComponent} from '../../components/default-signup-layout/default-signup-layout.component';
import {SignupDataService} from '../../services/signup-data.service';

interface SignupForm {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    DefaultSignupLayoutComponent
  ],
  providers: [
    SignupDataService,
    ToastrService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private signupService: SignupDataService,
    private toastrService: ToastrService
  ) {
    this.signupForm = new FormGroup({
        name: new FormControl("", [Validators.required, Validators.minLength(3)]),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(6)]),
        passwordConfirm: new FormControl("", [Validators.required, Validators.minLength(6)])
      },
    )

  }

  //Mudança e criação de serviço
  // submit() {
  //   // console.log(this.signupForm.valid)
  //   this.signupService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe({
  //     next: () => this.toastrService.success("Sign up succesfully"),
  //     error: () => this.toastrService.error("Sorry, something went wrong.\nTry again later.")
  //   })
  // }

  onNext() {
    if (this.signupForm.valid) {
      this.signupService.saveData('signup', this.signupForm)
      this.router.navigate(['interview'])
      this.toastrService.success("Data save successfully!")

    } else {
      this.toastrService.error("Error, sorry. Try to check your data.")
    }
  }

  // Deve ir à landing-page, mas ainda não foi feita.
  onNavigate() {
    this.router.navigate(['login'])
  }

}
