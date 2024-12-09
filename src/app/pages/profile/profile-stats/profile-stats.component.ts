import {Component} from '@angular/core';
import {UserDataService} from '../../../../shared/services/user-data.service';

@Component({
  selector: 'app-profile-stats',
  standalone: true,
  imports: [],
  templateUrl: './profile-stats.component.html',
  styleUrl: './profile-stats.component.scss'
})
export class ProfileStatsComponent {
  public positionText: string = "your position";
  public positionUser: string = "2";
  public pointsUser: string = "8.5";
  public pointsText: string = "points";


  constructor(public userDataService: UserDataService) {
  }
}
