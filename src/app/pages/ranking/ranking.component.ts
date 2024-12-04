import { Component } from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    DefaultDashboardLayoutComponent
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {

}
