import {Component} from '@angular/core';
import {DefaultSignupLayoutComponent} from '../../components/default-signup-layout/default-signup-layout.component';
import {
  CheckboxRequiredValidator, FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators
} from '@angular/forms';
import {
  SecondaryInputDatalistComponent
} from '../../components/secondary-input-datalist/secondary-input-datalist.component';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';

interface InterviewForm {
  username: FormControl;
  subject: FormControl;
}

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [
    DefaultSignupLayoutComponent,
    ReactiveFormsModule,
    SecondaryInputDatalistComponent,
    PrimaryInputComponent
  ],
  providers: [
    ToastrService,
    FormBuilder
  ],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.scss'
})
export class InterviewComponent {
  interviewForm!: FormGroup<InterviewForm>;

  constructor(
    private router: Router,
    private formBulder: FormBuilder,
    private toastService: ToastrService
  ) {
    this.interviewForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      subject: new FormControl('', [Validators.required,])
    })
  }

  submit() {
    console.log(this.interviewForm.valid)
  }

  navigate() {
    this.router.navigate(['login'])
  }
}
