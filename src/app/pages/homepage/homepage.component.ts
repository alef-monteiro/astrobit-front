import {Component, OnInit} from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';
import {Router} from '@angular/router';
import { GamecardDataService} from '../../../shared/services/gamecard-data.service';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [DefaultDashboardLayoutComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  cardList: {
    isCurrent: boolean; route: string; author:  string;
    icon: `/assets/${string}`; title: string }[] = [];

  titleHome: string = 'MAKE YOUR CHOICE';

  constructor(
    private route: Router,
    public gamecardData: GamecardDataService,
  ) {
  }

  ngOnInit() {
    this.gamecardData.getGameCards().subscribe({
      next: (data) => {
        console.log('Lista de jogos:', data);

        // Map data into the cardList
        this.cardList = data.map((card, index) => ({
          title: card.game_title || `Game ${index + 1}`,
          icon: `/assets/${card.image}` || '/assets/illustration-game-card-blue.png', // Ajuste do ícone
          author: card.author_name || 'Unknown',
          route: 'game-page',
          isCurrent: false
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar os jogos:', error);
      }
    });
  }

  onNavigate() {
    return this.route.navigate(['homepage']);
  }
}
