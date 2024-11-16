import { Component } from '@angular/core';
import {SidenavComponent} from './sidenav/sidenav.component';
import {RankingBoxComponent} from './ranking-box/ranking-box.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-default-dashboard-layout',
  standalone: true,
  imports: [
    SidenavComponent,
    RankingBoxComponent
  ],
  templateUrl: './default-dashboard-layout.component.html',
  styleUrl: './default-dashboard-layout.component.scss'
})
export class DefaultDashboardLayoutComponent {
  username: string = "USERNAME";
  userAvgGrade: number = 8.5;
  userCoins: number = 152;
  logoutText: string = "Logout";
  userRank: string = "2";

  constructor(private router: Router) {
  }

  public navigate(){
    this.router.navigate(['/login']);
  }

}
