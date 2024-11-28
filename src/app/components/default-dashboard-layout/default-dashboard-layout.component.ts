import {Component} from '@angular/core';
import {SidenavComponent} from './sidenav/sidenav.component';
import {RankingBoxComponent} from './ranking-box/ranking-box.component';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ApiEndpointsService} from '../../../shared/services/api-endpoints.service';

@Component({
  selector: 'app-default-dashboard-layout',
  standalone: true,
  imports: [
    SidenavComponent,
    RankingBoxComponent
  ],
  templateUrl: './default-dashboard-layout.component.html',
  styleUrl: './default-dashboard-layout.component.scss'
})

export class DefaultDashboardLayoutComponent {
  username: string = "USERNAME";
  userAvgGrade: number = 8.5;
  userCoins: number = 152;
  logoutText: string = "Logout";
  titleRankin: string = "ranking";

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private endPointService: ApiEndpointsService) {
  }

  public onNavigate(): void {
    this.router.navigate(['/homepage']);
  }

  public onLogout(): void {
    this.httpClient.get(
      this.endPointService.endpoints.logoutUser,
      {withCredentials: true}).subscribe({
      next: (data: any) => {
        console.log("data.name", data.name);
      },
      error: err => {
        console.log('error');
      }
    })
  }
}
