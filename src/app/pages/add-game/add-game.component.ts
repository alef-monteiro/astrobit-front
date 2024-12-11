import {Component, HostListener} from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {GameCardDataService} from '../../../shared/services/game-card-data.service';
import {ToastrService} from 'ngx-toastr';
import {UserDataService} from '../../../shared/services/user-data.service';
import {Card} from '../../../shared/models/card';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [
    DefaultDashboardLayoutComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.scss'
})

export class AddGameComponent {

  public title: string = "Adicionar Jogo";
  public primaryBtnText: string = "Salvar";
  public authorName: string;
  public screenWidth: number;
  public registerCardForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserDataService,
    private gameService: GameCardDataService,
    private toastr: ToastrService
  ) {

    this.registerCardForm = this.formBuilder.group({
      game_title: ['', [Validators.required, Validators.maxLength(12)]],
      author: this.userService.user.id,
      author_name: this.userService.user.name,
      description: ['', [Validators.required, Validators.maxLength(50)]],
      image: ['', [Validators.required]],
      link: ['', [Validators.required]],
    })

    this.authorName = this.userService.user.name;
    this.screenWidth = window.innerWidth;
  }

  get previewCard(): Card {
    return this.registerCardForm.value
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = (event.target as Window).innerWidth;
  }

  isSmallScreen(): boolean {
    return this.screenWidth < 768; // Telas pequenas
  }

  onSubmit(): void {
    debugger
    const formValues = this.registerCardForm.value;
    if (this.registerCardForm.valid) {

      const newCard = new Card();

      newCard.author = formValues.author;
      newCard.game_title = formValues.game_title;
      newCard.author_name = formValues.author_name;
      newCard.description = formValues.description;
      newCard.link = formValues.link;
      newCard.image = formValues.image;

      this.gameService.createGameCard(newCard).subscribe({
        next: (data) => {
          this.toastr.success(
            `${data.game_title} successfully!`
          )
          this.registerCardForm.reset();
        },
        error: () => {
          this.toastr.error(
            'Sorry, something went wrong. Please try again.'
          )
        }
      })
    }
  }
}


