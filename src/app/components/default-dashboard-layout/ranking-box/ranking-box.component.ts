import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {URLS} from '../../../../shared/urls';
import {HttpClient} from '@angular/common/http';
import {Score} from '../../../../shared/models/rankuser';
import {UserDataService} from '../../../../shared/services/user-data.service';

@Component({
  selector: 'app-ranking-box',
  standalone: true,
  imports: [

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

  public search(): void {
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
