import {Component} from '@angular/core';
import {
  DefaultGameLayoutComponent
} from '../../components/default-game-layout/default-game-layout.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    DefaultGameLayoutComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
}
