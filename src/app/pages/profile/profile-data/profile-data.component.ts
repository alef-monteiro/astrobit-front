import { Component } from '@angular/core';
import {UserDataService} from '../../../../shared/services/user-data.service';

@Component({
  selector: 'app-profile-data',
  standalone: true,
  imports: [],
  templateUrl: './profile-data.component.html',
  styleUrl: './profile-data.component.scss'
})
export class ProfileDataComponent {

  constructor(public userData: UserDataService) {
  }

}
