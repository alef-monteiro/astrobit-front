import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PrimaryInputComponent} from "../../../components/primary-input/primary-input.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile-update',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        PrimaryInputComponent,
        ReactiveFormsModule
    ],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.scss'
})
export class ProfileUpdateComponent {

}
