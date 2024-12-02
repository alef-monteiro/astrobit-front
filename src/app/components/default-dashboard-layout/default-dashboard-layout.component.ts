import {Component} from '@angular/core';
import {SidenavComponent} from './sidenav/sidenav.component';
import {RankingBoxComponent} from './ranking-box/ranking-box.component';
import {Router} from '@angular/router';
import {LoginDataService} from '../../../shared/services/login-data.service';
import {ToastrService} from 'ngx-toastr';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-default-dashboard-layout',
  standalone: true,
  imports: [
    SidenavComponent,
    RankingBoxComponent,
    NgIf
  ],
  templateUrl: './default-dashboard-layout.component.html',
  styleUrl: './default-dashboard-layout.component.scss'
})

export class DefaultDashboardLayoutComponent {
  public logoutText: string = 'Logout';
  loading: boolean = false;

  constructor(private router: Router,
              private loginService: LoginDataService,
              private toastr: ToastrService) {
  }

  onLogout() {
    this.toastr.info(`See you later, ${this.loginService.user.name}`);
    return this.loginService.logout(),
      this.router.navigate(['login']);
  }
}
