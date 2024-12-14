import {Component} from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../../components/default-dashboard-layout/default-dashboard-layout.component';
import {PrimaryInputComponent} from '../../../components/primary-input/primary-input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Card} from '../../../../shared/models/card';
import {ToastrService} from 'ngx-toastr';
import {GameCardDataService} from '../../../../shared/services/game-card-data.service';
import {UserDataService} from '../../../../shared/services/user-data.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register-game',
  standalone: true,
  imports: [
    DefaultDashboardLayoutComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register-game.component.html',
  styleUrl: './register-game.component.scss'
})
export class RegisterGameComponent {


  public title: string = 'Adicionar jogo';
  public registerGameForm!: FormGroup;
  public primaryBtnText: string = "salvar";


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private gameService: GameCardDataService,
    private router: Router,
    public userService: UserDataService,
  ) {
    const currentUser = this.userService.user;
    console.log('User:', currentUser);

    if (!currentUser) {
      this.toastr.error('Usuário não está logado. Por favor, faça login.');
      this.router.navigate(['/login']).then();
      return;
    }
    this.registerGameForm = this.fb.group({
      game_title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      link: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (!this.registerGameForm.valid) {
      this.toastr.error("Formulário inválido. Por favor, verifique os campos.")
    } else {
      const gameData: Card = {
        author: this.userService.user.id,
        active: false,
        ...this.registerGameForm.value,
      };
      console.log('GameData', gameData);

      this.gameService.createGameCard(gameData).subscribe({
        next: (data) => {
          console.log('Next:', data);
          this.toastr.success('Jogo registrado com sucesso!');
          this.router.navigate(['creator']).then();
        },
        error: (err) => {
          this.toastr.error('Ocorreu um erro ao registrar o jogo. Tente novamente.');
          console.error(err);
        },
      });
    }
  }

  public onNavigate() {
    if (!confirm('Deseja realmente cancelar?')) return;
    this.router.navigate(['creator']).then();
  }
}
