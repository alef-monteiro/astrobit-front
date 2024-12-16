import {Component, OnInit} from '@angular/core';
import {Rankuser} from '../../../shared/models/rankuser';
import {URLS} from '../../../shared/urls';
import {HttpClient} from '@angular/common/http';
import {RankingService2} from '../../../shared/services/ranking2';

@Component({
  selector: 'app-default-ranking-layout',
  standalone: true,
    imports: [],
  templateUrl: './default-ranking-layout.component.html',
  styleUrl: './default-ranking-layout.component.scss'
})
export class DefaultRankingLayoutComponent extends RankingService2<Rankuser> implements OnInit {

  public dataSource: Rankuser[] = [];
  public positionTitle = 'POSIÇÃO'
  public usernameTitle = 'APELIDO'
  public scoreTitle = 'PONTUAÇÃO'

  constructor(http: HttpClient) {
    super(http, URLS.RANKUSER);
  }


  // constructor(private rankingService: RankingService<Rankuser>,) {}

  ngOnInit() {
    this.search()
  }

  public search(): void {
    this.getAll<Rankuser>(URLS.RANKUSER).subscribe({
      next: (data: Rankuser[]) => {
        this.dataSource = data;
        console.log(data);

      },
      error: (e: any) => {
        console.error('Error loading ranking', e);
      }
    })
  }

  get sortedData() {
    return this.dataSource.slice().sort((a, b) => b.score - a.score);
  }
}
