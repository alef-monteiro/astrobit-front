import {Component, OnInit} from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';
import {Router} from '@angular/router';
import {GameCardDataService} from '../../../shared/services/game-card-data.service';
import {Card} from '../../../shared/models/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DefaultDashboardLayoutComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public cardList: Card[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public totalPages: number = 0;

  public title: string = 'GAMES';
  public noGamesTxt: string = "Nenhum jogo cadastrado.";

  public URLimage: string = 'https://github.com/alef-monteiro/astrobit-front/blob/develop/src/assets/illustration-game-card.png?raw=true';
  public primaryBtnText: string = "Go!";

  constructor(
    private route: Router,
    public gamecardData: GameCardDataService,
  ) {}

  public ngOnInit() {
    this.gamecardData.getGameCards().subscribe({
      next: (data) => {
        this.cardList = data;
        this.totalPages = Math.ceil(this.cardList.length / this.itemsPerPage);
      },
      error: (error) => {
        console.error('Erro ao carregar os jogos:', error);
      }
    });
  }

  public paginatedCards(): Card[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.cardList.slice(startIndex, endIndex);
  }

  public onNavigate(route: string) {
    this.route.navigate([route]).then();
  }

  public nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}

