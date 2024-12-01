import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  loading: boolean = false;

  constructor(private loginService: LoginDataService) {
  }

  onSubmit() {
    this.submit.emit();
    this.loading = true;
  }

  onNavigate() {
    this.navigate.emit();
  }

}
