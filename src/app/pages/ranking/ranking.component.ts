import {Component, OnInit} from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';
import {
    DefaultAvatarRankingLayoutComponent
} from "../../components/default-ranking-layout/default-avatar-ranking-layout/default-avatar-ranking-layout.component";
import {RankingBoxComponent} from "../../components/default-dashboard-layout/ranking-box/ranking-box.component";
import {SidenavComponent} from "../../components/default-dashboard-layout/sidenav/sidenav.component";
import {Router} from '@angular/router';
import {UserDataService} from '../../../shared/services/user-data.service';
import {ToastrService} from 'ngx-toastr';
import {DefaultRankingLayoutComponent} from '../../components/default-ranking-layout/default-ranking-layout.component';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    DefaultAvatarRankingLayoutComponent,
    SidenavComponent,
    DefaultRankingLayoutComponent,
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent{
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
