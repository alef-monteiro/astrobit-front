import {Component, OnInit} from '@angular/core';
import {URLS} from '../../../../shared/urls';
import {Rankuser} from '../../../../shared/models/rankuser';
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

  public dataSource: Rankuser[] = []
  public userPosition: number | null = null; // Posição do usuário
  public username: string = ''; // Nome de usuário atual
  public userId: number | null = null;


  constructor(public userService: UserDataService,) {

  }

  ngOnInit() {
    this.onSearch()
  }

  public onSearch(): void {
    this.userService.getAll<Rankuser>(URLS.RANKUSER).subscribe({
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
    return this.dataSource
      .slice()
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }
}
