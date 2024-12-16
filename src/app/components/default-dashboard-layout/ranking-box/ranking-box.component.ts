import {Component, OnInit} from '@angular/core';
import {RankUser} from '../../../../shared/models/rankuser';
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

  public dataSource: RankUser[] = []
  public userPosition: number | null = null;
  public username: string = '';
  public userId: number | null = null;


  constructor(public userService: UserDataService,) {}

  ngOnInit() {
    this.onSearch()
  }

  public onSearch(): void {
    this.userService.getRankData().subscribe({
      next: (data: RankUser[]) => {
        this.dataSource = data;
      },
      error: (error: any) => {
        console.error('Error loading ranking', error);
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
