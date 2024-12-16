import {
  Component, OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../../../shared/models/card';
import { GameCardDataService } from '../../../shared/services/game-card-data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public object: Card = new Card();
  public safeUrl: SafeResourceUrl;
  public checkSiteTxt: string = "Melhor perfomance";

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public service: GameCardDataService,
    private sanitizer: DomSanitizer,
  ) {
  }

  public onNavigate() {
    if(confirm('Deseja realmente cancelar?')) {
      this.router.navigate(['game']).then();
    }
  }

  ngOnInit() {
    // Verifica se o link está disponível antes de sanitizar
    const link = this.object.link;
    if (link) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link);
    } else {
      console.warn('Link não está disponível para sanitização');
    }

    // Verifica se a ação é 'create' e loga no console
    if (this.route.snapshot.paramMap.get('action') === 'create') {
      console.log('create');
    } else {
      // Obtém o ID da URL e faz a requisição para obter os dados do jogo
      const gameId = Number(this.route.snapshot.paramMap.get('action'));
      if (gameId) {
        this.object.id = gameId;
        this.service.getGameCardById(this.object.id).subscribe(
          {
            next: (response) => {
              console.log(response);
              this.object = response;

              // Garantir que a URL seja sanitizada após receber os dados
              if (this.object.link) {
                this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.object.link);
              }
            },
            error: (error) => {
              console.error('Erro ao buscar os dados do jogo:', error);
            }
          });
      } else {
        console.warn('ID do jogo não é válido');
      }
    }
  }

  openInNewTab(url: string): void {
    if (confirm('Deseja realmente abrir o jogo em uma nova aba?')) {
      window.open(url, '_blank'); // Abre o link em uma nova aba}
    }
  }
}
