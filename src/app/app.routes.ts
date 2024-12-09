import {Routes} from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {GamePageComponent} from './pages/game-page/game-page.component';
import {RankingComponent} from './pages/ranking/ranking.component';
import {GameComponent} from './pages/game/game.component';
import {AddGameComponent} from './pages/add-game/add-game.component';


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
    component: GamePageComponent
  },
  {
    path: "add-game",
    component: AddGameComponent
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
