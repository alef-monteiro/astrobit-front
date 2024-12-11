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
  public cardList: Card [] = [];

  public title: string = 'GAMES';

  constructor(
    private route: Router,
    public gamecardData: GameCardDataService,
  ) {
  }

  public ngOnInit() {
    this.gamecardData.getGameCards().subscribe({
      next: (data) => {
        console.log('Carregando jogos:', data);
        this.cardList = data;
      },
      error: (error) => {
        console.error('Erro ao carregar os jogos:', error);
      }
    });
  }

  public onNavigate(route:string) {
    this.route.navigate([route]).then();
  }

}
