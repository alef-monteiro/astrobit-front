import {Component, OnInit} from '@angular/core';
import {
  DefaultDashboardLayoutComponent
} from '../../components/default-dashboard-layout/default-dashboard-layout.component';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GameCardDataService} from '../../../shared/services/game-card-data.service';
import {ToastrService} from 'ngx-toastr';
import {UserDataService} from '../../../shared/services/user-data.service';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [
    DefaultDashboardLayoutComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.scss'
})

  export class AddGameComponent implements  OnInit {
  public title: string = "Add Game";
  public registerCardForm!: FormGroup;
  public authorName: string ;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserDataService,
    private gameService: GameCardDataService,
    private toastr: ToastrService
  ){
    this.registerCardForm = this.formBuilder.group({
      image: ['', [Validators.required]],
      link: ['', [Validators.required]],
      game_title: ['', [Validators.required, Validators.maxLength(12)]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      author: this.userService.user.id,
      author_name: this.userService.user.name,
    })

    this.authorName = this.userService.user.name
  }

  public ngOnInit() {
    this.registerCardForm.markAllAsTouched();
  }

  onSubmit() {
    let gameTitle: string = this.registerCardForm.value.game_title;
    if(this.registerCardForm.valid){
      this.gameService.createGameCard(this.registerCardForm.value).subscribe({
        next: (data) => {
          console.log(data)
          this.toastr.success(
            `Registered successifuly, ${gameTitle}!`,
          )

        },
        error: () =>{
          this.toastr.error(
            'Sorry, something went wrong. Please try again.'
          )
        }
      })
    }else {
      this.toastr.error(
        'Sorry, Invalid form. Please try again.'
      )
    }
  }

  onNavigate() {
    this.router.navigate(['game']);
  }
}
