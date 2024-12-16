import {Component, OnInit, Output} from '@angular/core';
import {Card} from '../../../../shared/models/card';
import {GameCardDataService} from '../../../../shared/services/game-card-data.service';
import {ToastrService} from 'ngx-toastr';
import {UpdateGameComponent} from '../update-game/update-game.component';
import {Router} from '@angular/router';
import {UserDataService} from '../../../../shared/services/user-data.service';
import {CardInfoComponent} from './card-info/card-info.component';

@Component({
  selector: 'app-list-game',
  standalone: true,
  imports: [UpdateGameComponent, CardInfoComponent],
  templateUrl: './list-game.component.html',
  styleUrl: 'list-game.component.scss',
})
export class ListGameComponent implements OnInit {
  @Output('cardID') cardId: number;

  public title: string = 'Meus jogos';
  public URLimage: string = 'https://github.com/alef-monteiro/astrobit-front/blob/develop/src/assets/illustration-game-card.png?raw=true';

  public cardsList: Card[] = [];
  public noGamesTxt: string = 'Nenhum jogo cadastrado.';
  public addBtnTxt: string = 'Adicionar';

  public openUpdateWindow: boolean = false;
  public openInfoWindow: boolean = false;

  constructor(
    private toastr: ToastrService,
    private gamecardData: GameCardDataService,
    public userData: UserDataService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.gamecardData.getGameCards().subscribe({
      next: (data) => {
        this.cardsList = data;
      },
      error: (error) => {
        console.error('Erro ao carregar os jogos:', error);
        this.toastr.error('Erro ao carregar os jogos. Tente novamente.');
      },
    });
  }

  public onNavigate(router: string) {
    this.route.navigate([router]).then();
  }

  public hasGames(): boolean {
    return this.cardsList.some(card => card.author === this.userData.user?.id);
  }

  public onEdit(id: number) {
    this.openUpdateWindow = true;
    this.cardId = id;
  }

  public onDelete(id: number): void {
    if (confirm('Deseja realmente deletar esse jogo?')) {
      this.gamecardData.deleteGameCard(id).subscribe({
        next: () => {
          this.cardsList = this.cardsList.filter((card) => card.id !== id);
          this.toastr.success('Jogo deletado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao deletar o jogo:', err);
          this.toastr.error('Não foi possível deletar o jogo. Tente novamente.');
        },
      });
    }
  }

  public onCloseUpdateWindow() {
    this.openUpdateWindow = false;
  }

  public onOpenInfoWindow(id: number) {
    this.openInfoWindow = true;
    this.cardId = id;
  }

  public onCloseInfoWindow() {
    this.openInfoWindow = false;
  }

}
