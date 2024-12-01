import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {LoginDataService} from '../../../../shared/services/login-data.service';
import {ToastrService} from 'ngx-toastr';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
  isCurrent: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})

export class SidenavComponent {
  @Input() logoutText: string;
  @Output('logout') logout = new EventEmitter();

  public userPoints: string = '100';
  public menuList: MenuItem[] = [];

  constructor(private router: Router,
              public loginService: LoginDataService,
              private toastr: ToastrService) {
    this.menuList = [
      {title: 'Home', icon: '/assets/nav-icons/home.svg', route: 'homepage', isCurrent: false},
      {title: 'Profile', icon: '/assets/nav-icons/account.svg', route: 'profile', isCurrent: false},
      {title: 'Ranking', icon: '/assets/nav-icons/ranking.svg', route: 'ranking', isCurrent: false},
      {title: 'Settings', icon: '/assets/nav-icons/settings.svg', route: 'settings', isCurrent: false},
    ];
  }


  changeMenu(menu: MenuItem) {
    this.menuList.forEach((item: MenuItem) => (item.isCurrent = item === menu));
    this.router.navigate([menu.route]);
  }

  onLogout(): void {

    return this.logout.emit()
  }

}

