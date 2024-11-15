import {Component} from '@angular/core';
import {DefaultSignupLayoutComponent} from '../../components/default-signup-layout/default-signup-layout.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  SecondaryInputDatalistComponent
} from '../../components/secondary-input-datalist/secondary-input-datalist.component';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {SignupDataService} from '../../services/signup-data.service';

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
    SignupDataService,
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
    private toastService: ToastrService,
    private interviewService: SignupDataService
  ) {
    this.interviewForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      subject: new FormControl('', [Validators.required,])
    })
  }

  onSubmit() {
    if (this.interviewForm.valid) {
      this.interviewService.saveData('interview', this.interviewForm.value);

      // Enviar os dados completos para o backend
      this.interviewService.submitData().subscribe({
        next: () => {
          this.toastService.success('Data saved successfully!');
          this.router.navigate(['dashboard']);

          console.log('Dados enviados:', JSON.stringify(this.interviewForm.value));
        },
        error: (err) => {
          this.toastService.error('Error sending data, please try again.');
          console.error('Erro ao enviar dados:', err);
        }
      });
    } else {
      this.toastService.error('Error, please check your data.');
    }
  }


  onNavigate() {
    this.router.navigate(['login']);
  }
}
