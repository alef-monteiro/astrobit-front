import {Component, EventEmitter, Input, numberAttribute, OnInit, Output} from '@angular/core';
import {Card} from '../../../../../shared/models/card';
import {GameCardDataService} from '../../../../../shared/services/game-card-data.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss'
})
export class CardInfoComponent implements OnInit {
  @Input({transform: numberAttribute}) id: number;
  @Output() closeInfoWindow: EventEmitter<boolean> = new EventEmitter();

  public object: Card = new Card();

  public cardInfoTxt: string = "Informações";
  public gameTitleTxt: string = "Title";
  public descriptionTxt: string = "Description";
  public linkTxt: string = "Link";
  public activeTxt: string = "Active";

  public secondaryBtnText: string = "Jogar";
  public primaryBtnText: string = "x";


  constructor(
    public serviceCard: GameCardDataService,
    private toastr: ToastrService,
    private route: Router
  ) {
  }

  ngOnInit() {
    console.log(this.id);
    if (this.id == null) {
      console.log('create');
    } else {
      this.object.id = this.id;
      this.serviceCard.getGameCardById(this.object.id).subscribe({
        next: (response) => {
          this.object = response;
        },
        error: (error) => {
          console.error('Erro ao buscar o Jogo:', error);
          this.closeInfoWindow.emit(true);
          this.toastr.error('Erro ao buscar o Jogo. Tente novamente.');
        },
        complete: () => {
          console.log('Busca do Jogo concluída.');
        },
      });
    }
  }

  public onNavigate(router: string) {
    this.route.navigate([router]).then();
  }

  public onCloseInfoWindow() {
    this.closeInfoWindow.emit(true);
  }
}
