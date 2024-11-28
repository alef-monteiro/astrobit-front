import { Component } from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    DefaultDashboardLayoutComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
