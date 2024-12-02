import {booleanAttribute, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {LoginDataService} from '../../../shared/services/login-data.service';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText = "";
  @Input() secondaryBtnText = "";
  @Input() disablePrimaryBtn: boolean = true;

  @Output("submit") submit = new EventEmitter();
  @Output("navigate") navigate = new EventEmitter();

  constructor() {
  }

  onSubmit() {
    this.submit.emit();
  }

  onNavigate() {
    this.navigate.emit();
  }

}
