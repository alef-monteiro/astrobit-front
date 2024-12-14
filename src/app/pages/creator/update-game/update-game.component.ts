import {Component, EventEmitter, Input, numberAttribute, OnInit, Output} from '@angular/core';
import {Card} from '../../../../shared/models/card';
import {GameCardDataService} from '../../../../shared/services/game-card-data.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../../components/primary-input/primary-input.component';

@Component({
  selector: 'app-update-game',
  standalone: true,
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.scss']
})
export class UpdateGameComponent implements OnInit {
  @Input({transform: numberAttribute}) id: number;
  @Output() closeUpdateWindow: EventEmitter<boolean> = new EventEmitter();

  public object: Card = new Card();
  public updateForm!: FormGroup;

  public updateTxt: string = "Atualizar";
  public primaryBtnText: string = "Salvar";
  public secondaryBtnText: string = "Cancelar";


  constructor(
    private service: GameCardDataService,
    public fb: FormBuilder,
  ) {
    this.updateForm = fb.group({
      game_title: ['', [Validators.required, Validators.minLength(3)]], // Ajustado
      description: ['', [Validators.required, Validators.minLength(10)]], // Ajustado
    });
  }

  ngOnInit() {
    this.updateForm.markAllAsTouched();
    console.log(this.id);

    if (this.id == null) {
      console.log('create');
    } else {
      this.object.id = this.id;
      this.service.getGameCardById(this.object.id).subscribe({
        next: (response) => {
          this.object = response;
          this.updateForm.patchValue(response);
        },
        error: (error) => {
          console.error('Erro ao buscar o Jogo:', error);
        },
        complete: () => {
          console.log('Busca do Jogo concluída.');
        },
      });
    }
  }


  onSubmit() {
    if (this.updateForm.valid && confirm('Deseja realmente salvar?')) {
      const data = this.updateForm.value;
      if (this.id) {
        this.service.updateGameCard(this.id, data).subscribe(() => {
          console.log('Atualizado com sucesso');
          this.closeUpdateWindow.emit(false);
        });
      } else {
          console.log('Erro ao atualizar');
      }
    } else {
      console.log('Formulário inválido');
    }
  }

  onNavigate() {
    if (confirm('Deseja realmente cancelar?')) {
      this.closeUpdateWindow.emit(false);
    }
  }
}
