import { Component } from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../../components/default-dashboard-layout/default-dashboard-layout.component';
import { PrimaryInputComponent } from '../../../components/primary-input/primary-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from '../../../../shared/models/card';
import { ToastrService } from 'ngx-toastr';
import { GameCardDataService } from '../../../../shared/services/game-card-data.service';
import { UserDataService } from '../../../../shared/services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-game',
  standalone: true,
  imports: [
    DefaultDashboardLayoutComponent,
    PrimaryInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './register-game.component.html',
  styleUrl: './register-game.component.scss'
})
export class RegisterGameComponent {
  public title: string = 'Adicionar jogo';
  public updateGameForm!: FormGroup;
  public primaryBtnText: string = "salvar";

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private gameService: GameCardDataService,
    private router: Router,
    public userService: UserDataService,
  ) {
    const currentUser = this.userService.user;

    if (!currentUser) {
      this.toastr.error('Usuário não está logado. Por favor, faça login.');
      this.router.navigate(['/login']);
      return;
    }

    this.updateGameForm = this.fb.group({
      author: [currentUser.id, [Validators.required]],
      author_name: [currentUser.name, [Validators.required]],
      game_title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      link: ['', [Validators.required, Validators.pattern('(https?://)?[\\w.-]+(/\\S*)?')]],
    });
  }

  onNavigate() {
    if (!confirm('Deseja realmente cancelar?')) return;
    this.router.navigate(['creator']);
  }

  public onSubmit() {
    if (!this.updateGameForm.valid) {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }

    const object: Card = this.updateGameForm.value;

    if (!object.link.startsWith('http')) {
      this.toastr.error('O link deve ser uma URL válida.');
      return;
    }

    this.gameService.createGameCard(object).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success(`${data.game_title} adicionado com sucesso!`);
        this.router.navigate(['creator']);
      },
      error: (error) => {
        console.error('Erro ao adicionar jogo:', error);
        if (error.status === 400) {
          this.toastr.error('Dados inválidos. Por favor, verifique os campos preenchidos.');
        } else if (error.status === 0) {
          this.toastr.error('Falha na conexão com o servidor. Tente novamente mais tarde.');
        } else {
          this.toastr.error('Erro inesperado ao adicionar jogo!');
        }
      }
    });
  }
}
