import {Component, OnInit} from '@angular/core';
import {RankUser} from '../../../shared/models/rankuser';
import {UserDataService} from '../../../shared/services/user-data.service';

@Component({
  selector: 'app-default-ranking-layout',
  standalone: true,
    imports: [],
  templateUrl: './default-ranking-layout.component.html',
  styleUrl: './default-ranking-layout.component.scss'
})
export class DefaultRankingLayoutComponent implements OnInit {
  public rankList: RankUser[] = [];

  public positionTitle = 'posição';
  public usernameTitle = 'APELIDO';
  public scoreTitle = 'PONTUAÇÃO';
  public noDataTxt: string = 'Sem dados para exibir';

  constructor(private userService: UserDataService) {}

  ngOnInit() {
    this.onSearch();
  }

  public onSearch(): void {
    this.userService.getRankData().subscribe({
      next: (data: RankUser[]) => {
        console.log(data);
        this.rankList = data;
      },
      error: (error: any) => {
        console.log(error);
        console.error('Error loading ranking', error);
      },
    });
  }

  // Retorna os 10 primeiros itens ordenados por pontuação
  get sortedData(): RankUser[] {
    return this.rankList.slice().sort((a, b) => b.score - a.score).slice(0, 10);
  }
}


