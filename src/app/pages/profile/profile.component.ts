import {Component} from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileStatsComponent} from './profile-stats/profile-stats.component';
import {ProfileDataComponent} from './profile-data/profile-data.component';
import {ProfileUpdateComponent} from './profile-update/profile-update.component';
import {UserDataService} from '../../../shared/services/user-data.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

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
  public title: string = 'Perfil';
  public editBtnTxt: string = 'Editar';
  public openUpdateWindow: boolean = false;
  public deleteText: string = "Deletar";

  constructor(public userDataService: UserDataService,
              private toastr: ToastrService,
              private router: Router,) {
  }

  onNext() {
    this.openUpdateWindow = true;
  }

  onCloseUpdateWindow() {
    this.openUpdateWindow = false;
  }

  onDelete() {
    if (confirm("Deseja mesmo deletar sua conta?")) {
      this.userDataService.deleteProfile().subscribe({
        next: () => {
          this.userDataService.logout();
          this.router.navigate(['login']).then();
          this.toastr.success("Conta deletada com sucesso!");

        }
        , error: () => {
          window.location.reload();
          this.toastr.error("Erro ao deletar conta!")
        }
      })
    }
  }
}
