import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

interface PositionItem {
  id: number;
  username: string;
  // route: string;
  isCurrent: boolean;
}
import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-ranking-box',
  standalone: true,
  imports: [
    NgForOf,
  ],
  templateUrl: './ranking-box.component.html',
  styleUrl: './ranking-box.component.scss'
})
export class RankingBoxComponent implements OnInit {

  public dataSource = [{ user: 'João', score: 2100},{ user: 'Maria', score: 23},{ user: 'Saymon', score: 325}];
  // public displayedColumns: string[] = ['user', 'score'];
  // public searchValue: string = '';

  // constructor(private http: HttpClient) {
  // }

  ngOnInit() {
    // this.search
  }

  // public getAll<T>(route: string): Observable<T[]> {
  //   const url = `${URLS.BASE}${route}`;
  //   return this.http.get<T[]>(url)
  // }
  //
  //
  // public search(resetIndex:boolean = false): void {
  //   this.getAll<Score>(URLS.SCORE).subscribe({
  //     next: (data: Score[]) => {
  //       this.dataSource = data;
  //     },
  //     error: (e: any) => {
  //       console.error('Error loading ranking');
  //     }
  //   })
  // }

  get sortedData() {
    return this.dataSource.slice().sort((a, b) => b.score - a.score);
  }
export class RankingBoxComponent {
  public positionList: PositionItem[] = [];
  public router: Router = new Router();

  @Input() titleRanking = "";
  @Input() userPosition = "";

  constructor() {
    this.positionList = [
      {id: 1, username: 'Alef1212', isCurrent: false},
      {id: 2, username: 'Alef1232', isCurrent: false},
      {id: 3, username: 'Alef1222', isCurrent: false},

    ];
  }


}
