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
  public usernameTitle = 'Usuário';
  public scoreTitle = 'PONTUAÇÃO';
  public noDataTxt: string = 'Sem dados para exibir';

  constructor(public userService: UserDataService) {
  }

  ngOnInit() {
    this.onSearch();
    this.goToUserPosition(this.userService.user.id);
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

  public userCache: { [id: number]: string } = {};


  // Retorna os 10 primeiros itens ordenados por pontuação
  get sortedData(): RankUser[] {
    return this.rankList.slice().sort((a, b) => b.score - a.score).slice(0, 10);
  }

  public getUserName(id: number): string {
    if (this.userCache[id]) {
      return this.userCache[id]; // Retorna do cache se já buscou antes
    }

    this.userService.getUserById(id).subscribe({
      next: (data: any) => {
        this.userCache[id] = data.username; // Armazena no cache
      },
      error: (error: any) => {
        console.error('Error loading user', error);
        this.userCache[id] = 'Usuário Desconhecido'; // Nome padrão em caso de erro
      }
    });

    return 'Carregando...'; // Nome temporário até que a requisição complete
  }


  public getUserPosition(userId: number): number | null {
    const index = this.sortedData.findIndex(item => item.player === userId);
    return index !== -1 ? index + 1 : null;
  }

  public goToUserPosition(userId: number): void {
    const position = this.getUserPosition(userId);
    if (position !== null) {
      this.userService.setPosition(position);
    } else {
      console.error('Usuário não encontrado na tabela');
    }
  }
}


