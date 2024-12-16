import {Component} from '@angular/core';
import {SidenavComponent} from "../../components/default-dashboard-layout/sidenav/sidenav.component";
import {Router} from '@angular/router';
import {UserDataService} from '../../../shared/services/user-data.service';
import {ToastrService} from 'ngx-toastr';
import {DefaultRankingLayoutComponent} from '../../components/default-ranking-layout/default-ranking-layout.component';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
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
