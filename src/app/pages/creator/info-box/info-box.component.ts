import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-info-box',
  standalone: true,
  imports: [
  ],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.scss'
})
export class InfoBoxComponent {
  public cardTitle: string = 'Como criar um jogo?';
  public cardContentTxt: string = 'Este é o conteúdo do card que pode ser exibido ou escondido.';

  public isContentVisible: boolean = false;
  public linkSaibaMais = "saiba mais" ;

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }
}
