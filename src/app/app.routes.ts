import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/signup/signup.component';
import {InterviewComponent} from './pages/interview/interview.component';

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
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "interview",
    component: InterviewComponent
  }
];
