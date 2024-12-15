import {Component, EventEmitter, Input, numberAttribute, OnInit, Output} from '@angular/core';
import {Card} from '../../../../shared/models/card';
import {GameCardDataService} from '../../../../shared/services/game-card-data.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../../components/primary-input/primary-input.component';
import {ToastrService} from 'ngx-toastr';

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
    private serviceCard: GameCardDataService,
    public fb: FormBuilder,
    private toastr: ToastrService,
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
      this.serviceCard.getGameCardById(this.object.id).subscribe({
        next: (response) => {
          this.object = response;
          this.updateForm.patchValue(response);
          this.toastr.info(`${response.game_title}, encontrado!`)
        },
        error: (error) => {
          console.error('Erro ao buscar o Jogo:', error);
          this.closeUpdateWindow.emit(true);
          this.toastr.error('Erro ao buscar o Jogo. Tente novamente.');
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
        this.serviceCard.updateGameCard(this.id, data).subscribe({
          next: (response) => {
            console.log('Next:', response);
            this.closeUpdateWindow.emit(true);
            this.toastr.success(`${response.game_title}, atualizado com sucesso!`)
          },
          error: (error) => {
            console.error('Erro ao atualizar o Jogo:', error);
            this.toastr.error('Erro ao atualizar o Jogo. Tente novamente.');
            this.closeUpdateWindow.emit(true);
          },
        });
      } else {
          console.log('Erro ao atualizar');
        this.closeUpdateWindow.emit(true);

      }
    } else {
      console.log('Formulário inválido');

    }
  }

  onNavigate() {
    if (confirm('Deseja realmente cancelar?')) {
      this.closeUpdateWindow.emit(true);
    }
  }
}
