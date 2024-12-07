import {
  Component, OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Card} from '../../../shared/models/card';
import {GameCardDataService} from '../../../shared/services/game-card-data.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'] // Corrigido para 'styleUrls'
})
export class GameComponent implements OnInit {

  public object: Card = new Card();

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public service: GameCardDataService
  ) {}

  public onNavigate() {
    this.router.navigate(['game'])
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
}
