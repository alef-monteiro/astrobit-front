// interface PositionItem {
//   id: number;
//   username: string;
//   // route: string;
//   isCurrent: boolean;
// }
import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Observable} from 'rxjs';
import {URLS} from '../../../../shared/urls';
import {HttpClient} from '@angular/common/http';
import {Score} from '../../../../shared/models/rankuser';
import {Router} from '@angular/router';
import {UserDataService} from '../../../../shared/services/user-data.service';

@Component({
  selector: 'app-ranking-box',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
  ],
  templateUrl: './ranking-box.component.html',
  styleUrl: './ranking-box.component.scss'
})
export class RankingBoxComponent implements OnInit {

  public dataSource: Score[] = []
  public userPosition: number | null = null; // Posição do usuário
  public username: string = ''; // Nome de usuário atual
  public userId: number | null = null;

  constructor(private http: HttpClient,
              public loginService: UserDataService) {
  }

  ngOnInit() {
    this.search()
    if (this.loginService.user && this.loginService.user.id) {
      this.userId = this.loginService.user.id;
    } else {
      console.error('Usuário ou username não definido no loginService');
    }
  }

  public search(resetIndex:boolean = false): void {
    this.getAll<Score>(URLS.SCORE).subscribe({
      next: (data: Score[]) => {
        this.dataSource = data;
        this.calculateUserPosition();
        console.log(data);
      },
      error: (e: any) => {
        console.error('Error loading ranking', e);
      }
    })
  }

  public getAll<T>(route: string): Observable<T[]> {
    const url = URLS.BASE + route;
    return this.http.get<T[]>(url)
  }

  get sortedData() {
    return this.dataSource
      .slice()
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }

  get sortedDataEverybody() {
    return this.dataSource.slice().sort((a, b) => b.score - a.score);
  }

  private calculateUserPosition(): void {
    if (!this.userId) {
      console.error('ID do usuário não está definido.');
      return;
    }

    const sorted = this.sortedDataEverybody;

    // Encontrar a posição pelo ID do usuário
    const position = sorted.findIndex((item) => item.id === this.userId);
    this.userPosition = position >= 0 ? position + 1 : null; // Ajusta para índice humano (1-based)
  }
}



// private calculateUserPosition(): void {
//   // Verifica se o userId está definido
//   if (!this.userId) {
//   console.error('ID do usuário não está definido.');
//   this.userPosition = null;
//   return;
// }
//
// const sorted = this.sortedDataEverybody;
//
// // Verifica se o array ordenado está correto
// if (!sorted || sorted.length === 0) {
//   console.error('O array sortedDataEverybody está vazio ou indefinido.');
//   this.userPosition = null;
//   return;
// }
//
// console.log('Dados ordenados:', sorted);
// console.log('ID do usuário:', this.userId);
//
// // Encontra a posição pelo ID
// const position = sorted.findIndex((item) => String(item.id) === String(this.userId));
// this.userPosition = position >= 0 ? position + 1 : null;
//
// if (this.userPosition === null) {
//   console.warn('Usuário não encontrado no ranking.');
// } else {
//   console.log('Posição do usuário no ranking:', this.userPosition);
// }
// }
//
//
