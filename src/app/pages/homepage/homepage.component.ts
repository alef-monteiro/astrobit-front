import {Component} from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';
import {Router} from '@angular/router';
import {LoginDataService} from '../../../shared/services/login-data.service';

interface CardData {
  title: string;
  icon: string;
  route: string;
  author: string;
  isCurrent: boolean;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    DefaultDashboardLayoutComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  cardList: CardData[] = [];

  constructor(private route: Router,
              public loginData: LoginDataService) {
    this.cardList = [
      {
        title: 'Intro',
        icon: '/assets/illustration-game-card-blue.png',
        author: loginData.user.name,
        route: 'gamepage',
        isCurrent: false
      },
      {
        title: 'ColorGame',
        icon: '/assets/illustration-game-card.png',
        author: loginData.user.name,
        route: 'gamepage',
        isCurrent: false
      },
      {
        title: 'MathChallenge',
        icon: '/assets/illustration-game-card-red.png',
        author: loginData.user.name,
        route: 'gamepage',
        isCurrent: false
      },
      {
        title: 'AAAAAAA',
        icon: '/assets/illustration-game-card.png',
        author: loginData.user.name,
        route: 'gamepage',
        isCurrent: false
      },
      {
        title: 'BBBBBB',
        icon: '/assets/illustration-game-card-purple.png',
        author: loginData.user.name,
        route: 'gamepage',
        isCurrent: false
      },
      {
        title: 'CCCCCCCC',
        icon: '/assets/illustration-game-card-red.png',
        author: loginData.user.name,
        route: 'gamepage',
        isCurrent: false
      },
      {
        title: 'DDDDDDD',
        icon: '/assets/illustration-game-card-red.png',
        author: loginData.user.name,
        route: 'gamepage',
        isCurrent: false
      },      {
        title: 'EEEEEEEEE',
        icon: '/assets/illustration-game-card-purple.png',
        author: loginData.user.name,
        route: 'gamepage',
        isCurrent: false
      },      {
        title: 'FFFFFFFF',
        icon: '/assets/illustration-game-card.png',
        author: loginData.user.name,
        route: 'gamepage',
        isCurrent: false
      },
    ]
  }

  changeMenu(card: CardData) {
    this.cardList.forEach(
      (item: CardData) => (item.isCurrent = item === card)
    );
    this.route.navigate([card.route]);
  }
}
