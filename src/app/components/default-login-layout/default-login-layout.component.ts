import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [],
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

  public loading: boolean = false;

  onSubmit() {
    this.submit.emit();
    this.loading = true;
  }

  onNavigate() {
    this.navigate.emit();
  }

}
