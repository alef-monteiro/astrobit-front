import {Component, OnInit} from '@angular/core';
import {
  DefaultRegisterLayoutComponent
} from '../../components/default-register-layout/default-register-layout.component';
import {Router} from '@angular/router';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserDataService} from '../../../shared/services/user-data.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule,
    DefaultRegisterLayoutComponent,
    PrimaryInputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {
  public title: string = "Cadastro";
  public primaryBtnText: string = "Salvar";
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

  public ngOnInit() {
    this.registerForm.markAllAsTouched();
  }


  public onNavigate() {
    this.router.navigate(['login']).then();
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
            `Cadastro completo, ${nameUser}!`
          )
          this.router.navigate(['login']).then();
        },
        error: (err) => {
          if (err.error) {
            // Pega as mensagens de erro do objeto
            const errorMessages = [];
            for (const field in err.error) {
              if (err.error.hasOwnProperty(field)) {
                errorMessages.push(...err.error[field]);// Adiciona as mensagens ao array
              }
            }

            // Mostra as mensagens no Toastr
            if (errorMessages.length > 0) {
              errorMessages.forEach(message => {
                this.toastr.error(message);
              });
            } else {
              this.toastr.error('Ocorreu um erro ao registrar. Tente novamente.');
            }
          } else {
            this.toastr.error('Erro desconhecido. Por favor, tente novamente.');
          }
          console.error('Erro ao registrar:', err);
        }
      })
    } else {
      this.toastr.error(
        'Desculpe, formulário invalido. Por favor, verifique os campos.'
      )
    }
  }
}
