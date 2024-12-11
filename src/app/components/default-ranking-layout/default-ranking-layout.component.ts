import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Score} from '../../../shared/models/rankuser';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-default-ranking-layout',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './default-ranking-layout.component.html',
  styleUrl: './default-ranking-layout.component.scss'
})
export class DefaultRankingLayoutComponent implements OnInit {

  public dataSource: Score[] = [];
  public username: string = 'a';

  constructor(private http: HttpClient) {
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
    return this.dataSource.slice().sort((a, b) => b.score - a.score);
  }

}
