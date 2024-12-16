import {Component} from '@angular/core';

import {DefaultRankingLayoutComponent} from '../../components/default-ranking-layout/default-ranking-layout.component';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    DefaultRankingLayoutComponent,
    DefaultDashboardLayoutComponent,
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent{
  public title: string = "Ranking";
  public loading: boolean = false;

  public onUpdate() {
    window.location.reload();
    this.loading = true;
  }
}
