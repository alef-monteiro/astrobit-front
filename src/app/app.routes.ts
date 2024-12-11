import {Routes} from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {HomepageComponent} from './pages/home/homepage.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RankingComponent} from './pages/ranking/ranking.component';
import {GameComponent} from './pages/game/game.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "game",
    component: HomepageComponent
  },
  {
    path: "game/:action",
    component: GameComponent

  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "ranking",
    component: RankingComponent
  }
];
