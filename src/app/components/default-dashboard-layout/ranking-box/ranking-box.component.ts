import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

interface PositionItem {
  id: number;
  username: string;
  // route: string;
  isCurrent: boolean;
}

@Component({
  selector: 'app-ranking-box',
  standalone: true,
  imports: [],
  templateUrl: './ranking-box.component.html',
  styleUrl: './ranking-box.component.scss'
})
export class RankingBoxComponent {
  public positionList: PositionItem[] = [];
  public router: Router = new Router();

  @Input() titleRanking = "ranking";
  @Input() userPosition = "";

  constructor() {
    this.positionList = [
      {id: 1, username: 'Alef1212', isCurrent: false},
      {id: 2, username: 'Alef1232', isCurrent: false},
      {id: 3, username: 'Alef1222', isCurrent: false},

    ];
  }


}
