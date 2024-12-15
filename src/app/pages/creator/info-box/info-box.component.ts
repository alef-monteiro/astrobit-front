import {Component} from '@angular/core';

@Component({
  selector: 'app-info-box',
  standalone: true,
  imports: [],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.scss'
})
export class InfoBoxComponent {
  public cardTitle: string = 'Como criar um jogo?';
  public cardContentTxt: string =
    'Criar um jogo é fácil! É só clicar no botão "Adicionar", ' +
    'preencher os detalhes e adicionar o link do seu projeto no GitHub ' +
    '– a comunidade vai adorar avaliar! ' +
    'Quer saber mais? Clique no link e descubra como participar!';

  public isContentVisible: boolean = false;
  public linkSaibaMais = "saiba mais";

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }
}
