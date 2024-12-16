import {Component} from '@angular/core';
import {SidenavComponent} from './sidenav/sidenav.component';
import {Router} from '@angular/router';
import {UserDataService} from '../../../shared/services/user-data.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-default-dashboard-layout',
  standalone: true,
  imports: [
    SidenavComponent,
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
    this.toastr.info(`Até mais, ${this.loginService.user.name}!`);
    return this.loginService.logout(),
      this.router.navigate(['login']);
  }
}
