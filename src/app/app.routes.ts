import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {RegisterComponent} from './pages/register/register.component';
import {GamePageComponent} from './pages/game-page/game-page.component';
import {RankingComponent} from './pages/ranking/ranking.component';

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
    path: "homepage",
    component: HomepageComponent
  },
  {
    path: "gamepage",
    component: GamePageComponent
  },
  {
    path: "ranking",
    component: RankingComponent
  }
];
