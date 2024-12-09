import { Component } from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DefaultDashboardLayoutComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  titleProfile: string = 'Profile';

}
