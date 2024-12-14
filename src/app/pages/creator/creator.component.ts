import { Component } from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';
import {InfoBoxComponent} from './info-box/info-box.component';
import {ListGameComponent} from './list-game/list-game.component';

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [
    DefaultDashboardLayoutComponent,
    InfoBoxComponent,
    ListGameComponent
  ],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss'
})
export class CreatorComponent {

}
