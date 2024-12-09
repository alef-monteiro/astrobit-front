import {Component} from '@angular/core';
import {SidenavComponent} from './sidenav/sidenav.component';
import {RankingBoxComponent} from './ranking-box/ranking-box.component';
import {Router} from '@angular/router';
import {UserDataService} from '../../../shared/services/user-data.service';
import {ToastrService} from 'ngx-toastr';
import {
  DefaultAvatarRankingLayoutComponent
} from '../default-ranking-layout/default-avatar-ranking-layout/default-avatar-ranking-layout.component';

@Component({
  selector: 'app-default-dashboard-layout',
  standalone: true,
  imports: [
    SidenavComponent,
    RankingBoxComponent,
    DefaultAvatarRankingLayoutComponent
  ],
  templateUrl: './default-dashboard-layout.component.html',
  styleUrl: './default-dashboard-layout.component.scss'
})

export class DefaultDashboardLayoutComponent {
  public logoutText: string = 'Logout';

  constructor(private router: Router,
              private loginService: UserDataService,
              private toastr: ToastrService) {
  }

  onLogout() {
    this.toastr.info(`See you later, ${this.loginService.user.name}`);
    return this.loginService.logout(),
      this.router.navigate(['login']);
  }
}
