import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/signup/signup.component';
import {InterviewComponent} from './pages/interview/interview.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {
  DefaultDashboardLayoutComponent
} from './components/default-dashboard-layout/default-dashboard-layout.component';

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
    component: DefaultDashboardLayoutComponent
  }
];
