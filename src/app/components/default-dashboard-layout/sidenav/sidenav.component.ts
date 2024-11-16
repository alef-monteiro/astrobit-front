import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Input() username: string ="";
  @Input() userAvgGrade : number =0.0;
  @Input() userCoins :number = 0;

  constructor() {
  }
}
