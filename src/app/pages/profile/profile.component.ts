import {Component, Input, OnInit} from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileStatsComponent} from './profile-stats/profile-stats.component';
import {ProfileDataComponent} from './profile-data/profile-data.component';
import {ProfileUpdateComponent} from './profile-update/profile-update.component';
import {UserDataService} from '../../../shared/services/user-data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DefaultDashboardLayoutComponent,
    ReactiveFormsModule,
    ProfileStatsComponent,
    ProfileDataComponent,
    ProfileUpdateComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent {
  public title: string = 'Profile';
  public editBtnTxt: string = 'edit';
  public openUpdateWindow: boolean = false;

  constructor(public userData: UserDataService) {
  }

  onNext() {
    this.openUpdateWindow = true;
  }

  onCloseUpdateWindow() {
    this.openUpdateWindow = false;
  }
}
