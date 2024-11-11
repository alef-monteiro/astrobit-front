import { Component } from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/default-login-layout/default-login-layout.component';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        DefaultLoginLayoutComponent,
        RouterOutlet
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
