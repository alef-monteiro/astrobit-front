import {Component, EventEmitter, Output} from '@angular/core';
import {PrimaryInputComponent} from "../../../components/primary-input/primary-input.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserDataService} from '../../../../shared/services/user-data.service';
import {Router} from '@angular/router';
import {User} from '../../../../shared/models/user';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    PrimaryInputComponent
  ],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.scss'
})
export class ProfileUpdateComponent {
  @Output() closeUpdateWindow: EventEmitter<boolean> = new EventEmitter();

  public updateUSerForm!: FormGroup;
  public updateTxt: string = "Atualizar";
  public primaryBtnText: string = "Salvar";
  public secondaryBtnText: string = "Cancelar";

  constructor(
    private fb: FormBuilder,
    public userService: UserDataService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    const currentUser = this.userService.user;
    console.log('User:', currentUser);

    if (!currentUser) {
      this.toastr.error('Usuário não está logado. Por favor, faça login.');
      this.router.navigate(['/login']).then();
      return;
    }

    this.updateUSerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (!this.updateUSerForm.valid) {
      this.toastr.error("Formulário inválido. Por favor, verifique os campos.")
    } else {
      const userData: User = {
        ...this.updateUSerForm.value,
      };
      console.log('UserData', userData);

      this.userService.updateProfile(userData.name, userData.username, userData.email).subscribe({
        next: (data) => {
          console.log('Next:', data);
          this.toastr.success('Perfil atualizado com sucesso!');
          this.toClose()
        },
        error: (err) => {
          this.toastr.error('Ocorreu um erro ao atualizar o perfil. Tente novamente.');
          console.error(err);
        },
      })
    }
  }

  toClose() {
    if (confirm('Deseja realmente cancelar?')) {
      this.closeUpdateWindow.emit(false);
    }
  }
}
