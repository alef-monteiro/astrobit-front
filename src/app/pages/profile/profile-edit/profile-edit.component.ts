import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PrimaryInputComponent} from "../../../components/primary-input/primary-input.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile-edit',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        PrimaryInputComponent,
        ReactiveFormsModule
    ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {

}
