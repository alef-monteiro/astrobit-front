import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserDataService} from '../../../../shared/services/user-data.service';

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
  @Output("logout") logout = new EventEmitter();

  public userPoints: string = '100';
  public menuList: MenuItem[] = [];
  public addGameBtnTxt: string = "Meus Jogos";

  constructor(private router: Router,
              public loginService: UserDataService) {
    this.menuList = [
      {title: 'Início', icon: '/assets/nav-icons/home.svg', route: 'game', isCurrent: false},
      {title: 'Perfil', icon: '/assets/nav-icons/account.svg', route: 'profile', isCurrent: false},
      {title: 'Posições', icon: '/assets/nav-icons/ranking.svg', route: 'ranking', isCurrent: false},
    ];
  }

  public onNavigate(route:string) {
    this.router.navigate([route]).then();
  }


  public changeMenu(menu: MenuItem) {
    this.menuList.forEach((item: MenuItem) => (item.isCurrent = item === menu));
    this.router.navigate([menu.route]);
  }

  public onLogout(): void {
    return this.logout.emit()
  }

}

