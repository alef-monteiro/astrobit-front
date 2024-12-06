import {Component, OnInit} from '@angular/core';
import {
  DefaultGameLayoutComponent
} from '../../components/default-game-layout/default-game-layout.component';
import {ActivatedRoute} from '@angular/router';
import {Card} from '../../../shared/models/card';
import {GameCardDataService} from '../../../shared/services/game-card-data.service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    DefaultGameLayoutComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent implements OnInit {

  public object: Card = new Card();

  constructor(
    public route: ActivatedRoute,
    public service: GameCardDataService
  ) {

  }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('action') === 'create'){
      console.log('create');
    }else {
      this.object.id = Number(this.route.snapshot.paramMap.get('action'));
     this.service.getGameCardById(this.object.id).subscribe(
       (response) => {
         console.log(response);
         this.object = response;
       }
     )
    }
  }

  // ngOnInit(): void {
  //   this.questionGroupId = Number(this.route.snapshot.paramMap.get('id'));
  //   if (this.object.id) {
  //     this.formGroup.patchValue({
  //       description: this.object.description,
  //       questions_group_question: this.object.questions_group_question || [],
  //     });
  //   }
  //
  //   if (this.questionGroupId) {
  //     this.loadQuestionsData(); // Carregar dados do QuestionGroup
  //   } else {
  //     this.loadQuestions(); // Carregar perguntas para um novo QuestionGroup
  //   }
  // }
}
