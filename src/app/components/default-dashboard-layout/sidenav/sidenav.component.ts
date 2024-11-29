import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
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
  @Input() logoutText: string;
  @Input() username: string;
  @Input() userPoints: string;

  @Output('logout') logout = new EventEmitter();

  public menuList: MenuItem[] = [];

  constructor(private router: Router) {
    this.menuList = [
      {title: 'Home', icon: '/assets/nav-icon/home.svg', route: 'homepage', isCurrent: true},
      {title: 'Profile', icon: '/assets/nav-icon/profile.svg', route: 'profile', isCurrent: true},
      {title: 'Ranking', icon: '/assets/nav-icon/ranking.svg', route: 'ranking', isCurrent: true},
      {title: 'Settings', icon: '/assets/nav-icon/settings.svg', route: 'settings', isCurrent: true},
    ]
  }

  onNavigate(url: string) {
    return this.router.navigate([url]);
  }


  onLogout(): void {
    return this.logout.emit();
  }

}

