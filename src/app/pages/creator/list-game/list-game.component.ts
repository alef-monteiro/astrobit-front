import {Component, OnInit, Output} from '@angular/core';
import { Card } from '../../../../shared/models/card';
import { GameCardDataService } from '../../../../shared/services/game-card-data.service';
import { ToastrService } from 'ngx-toastr';
import {UpdateGameComponent} from '../update-game/update-game.component';
import {Router} from '@angular/router';
import {UserDataService} from '../../../../shared/services/user-data.service';

@Component({
  selector: 'app-list-game',
  standalone: true,
  imports: [ UpdateGameComponent],
  templateUrl: './list-game.component.html',
  styleUrl: './list-game.component.scss',
})
export class ListGameComponent implements OnInit {
  @Output('cardID') cardId: number;

  public title: string = 'Meus jogos';
  public URLimage: string = 'https://github.com/alef-monteiro/astrobit-front/blob/develop/src/assets/illustration-game-card.png?raw=true';

  public cards: Card[] = [];
  public openUpdateWindow: boolean = false;
  public noGamesTxt: string = 'Nenhum jogo cadastrado.';
  public addBtnTxt: string = 'Adicionar';

  constructor(
    private toastr: ToastrService,
    private gamecardData: GameCardDataService,
    public userData: UserDataService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.gamecardData.getGameCards().subscribe({
      next: (data) => {
        this.cards = data;
      },
      error: (error) => {
        console.error('Erro ao carregar os jogos:', error);
        this.toastr.error('Erro ao carregar os jogos. Tente novamente.');
      },
    });
  }

  onEdit(id:number) {
    this.openUpdateWindow = true;
    this.cardId = id;
  }

  onDelete(id: number): void {
    if (confirm('Deseja realmente deletar esse jogo?')) {
      this.gamecardData.deleteGameCard(id).subscribe({
        next: () => {
          this.cards = this.cards.filter((card) => card.id !== id);
          this.toastr.success('Jogo deletado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao deletar o jogo:', err);
          this.toastr.error('Não foi possível deletar o jogo. Tente novamente.');
        },
      });
    }
  }

  onCloseUpdateWindow() {
    this.openUpdateWindow = false;
  }

  onNavigate(router: string) {
    this.route.navigate([router]).then();
  }
}
