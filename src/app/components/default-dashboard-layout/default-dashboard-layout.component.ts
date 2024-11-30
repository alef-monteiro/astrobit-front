import {Component} from '@angular/core';
import {SidenavComponent} from './sidenav/sidenav.component';
import {RankingBoxComponent} from './ranking-box/ranking-box.component';
import {Router} from '@angular/router';
import {LoginDataService} from '../../../shared/services/login-data.service';

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
  public logoutText: string = 'Logout';

  constructor(private router: Router,
              private loginService: LoginDataService) {
  }

  onLogout() {
    return this.loginService.logout(),
      this.router.navigate(['login']);
  }
}
