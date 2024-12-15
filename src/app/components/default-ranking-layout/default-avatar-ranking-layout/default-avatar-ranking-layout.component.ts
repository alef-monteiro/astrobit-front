import {Component, OnInit} from '@angular/core';
import {Score} from '../../../../shared/models/rankuser';
import {HttpClient} from '@angular/common/http';
import {UserDataService} from '../../../../shared/services/user-data.service';
import {URLS} from '../../../../shared/urls';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-default-avatar-ranking-layout',
  standalone: true,
  imports: [
  ],
  templateUrl: './default-avatar-ranking-layout.component.html',
  styleUrl: './default-avatar-ranking-layout.component.scss'
})
export class DefaultAvatarRankingLayoutComponent implements OnInit {

  public dataSource: Score[] = []
  public userPosition: number | null = null; // Posição do usuário
  public username: string = ''; // Nome de usuário atual
  public userId: number | null = null;

  constructor(private http: HttpClient,
              public loginService: UserDataService) {
  }

  ngOnInit() {
    this.search()
  }

  public search(): void {
    this.getAll<Score>(URLS.SCORE).subscribe({
      next: (data: Score[]) => {
        this.dataSource = data;
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
}