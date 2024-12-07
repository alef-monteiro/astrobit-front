import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {Score} from '../../../../shared/models/rankuser';

@Component({
  selector: 'app-default-avatar-ranking-layout',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './default-avatar-ranking-layout.component.html',
  styleUrl: './default-avatar-ranking-layout.component.scss'
})
export class DefaultAvatarRankingLayoutComponent {

  }
}
