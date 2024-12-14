import {Component, Input, OnInit} from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';
import { ReactiveFormsModule} from '@angular/forms';
import {ProfileStatsComponent} from './profile-stats/profile-stats.component';
import {ProfileDataComponent} from './profile-data/profile-data.component';
import {NgIf} from '@angular/common';
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
    ProfileUpdateComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent {
  public activeProfileData: boolean = false;
  public title: string = 'Profile';
  public editBtnTxt: string = 'edit';
  public saveBtnTxt: string = 'save';

  constructor(public userData: UserDataService) {
  }

  onNext() {
  this.activeProfileData = !this.activeProfileData;
  }

  onSubmit() {
    this.activeProfileData = !this.activeProfileData;
  }
}
