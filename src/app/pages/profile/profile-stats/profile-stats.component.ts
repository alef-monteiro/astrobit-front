import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../../../shared/services/user-data.service';

@Component({
  selector: 'app-profile-stats',
  standalone: true,
  imports: [],
  templateUrl: './profile-stats.component.html',
  styleUrl: './profile-stats.component.scss'
})
export class ProfileStatsComponent implements OnInit {
  public positionText: string = "sua posição";
  public pointsText: string = "pontos";

  public position: number | null = null;
  public score: number | null = null;
  public noScoreTxt: string = "Nenhum score encontrado";

  constructor(public userDataService: UserDataService) {
  }

  public ngOnInit(){
    this.getRankUsersById(this.userDataService.user.id);
    this.position = this.userDataService.getPosition();
    console.log('Posição do usuário:', this.position);
  }

  public getRankUsersById(id: number): void {
    this.userDataService.getRankUsersById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.score = res.score; // Armazena o score do usuário
      },
      error: (err: any) => {
        console.error('Erro ao obter o score do usuário:', err);
        this.score = null; // Reseta o score em caso de erro
      }
    });
  }

}
