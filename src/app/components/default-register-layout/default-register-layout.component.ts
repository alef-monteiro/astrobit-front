import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-default-register-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-register-layout.component.html',
  styleUrl: './default-register-layout.component.scss'
})

export class DefaultRegisterLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;

  @Output("navigate") navigate = new EventEmitter();
  @Output("submit") submit = new EventEmitter();

  public onSubmit() {
    this.submit.emit();
  }

  public onNavigate(): void {
    this.navigate.emit();
  }

}
