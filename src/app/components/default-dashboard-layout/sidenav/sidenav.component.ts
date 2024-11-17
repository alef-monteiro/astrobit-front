import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';

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
  public menuList: MenuItem[] = [];
  public router: Router = new Router();

  @Input() username: string = "";
  @Input() userAvgGrade: number = 0.0;
  @Input() userCoins: number = 0;
  @Input() logoutText: string="";
  @Input() userRank: string = "";

  @Output("navigate") onNavigate = new EventEmitter();

  constructor() {
    this.menuList = [
      {title: 'Home', icon: 'assets/nav-icons/home.svg', route: '/homepage', isCurrent: false},
      {title: 'Profile', icon: 'assets/nav-icons/account.svg', route: '/profile', isCurrent: false},
      {title: 'Store', icon: 'assets/nav-icons/shopping_cart.svg', route: '/store', isCurrent: false},
      {title: 'Settings', icon: 'assets/nav-icons/settings.svg', route: '/config', isCurrent: false},
    ];
    this.changeMenu(this.menuList[0]);
  }

  protected changeMenu(menuItem: MenuItem) {
    this.menuList.forEach((m: MenuItem) => {
      m.isCurrent = m.route === menuItem.route;
    });
    this.goToPage(menuItem.route);
  }

  public goToPage(route: string): void {
    const extras: NavigationExtras = {queryParamsHandling: 'merge'};
    this.router.navigate([route], extras).then();
  }

  public navigate(): void {
    this.onNavigate.emit();
  }

}
