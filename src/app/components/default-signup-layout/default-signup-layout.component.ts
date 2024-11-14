import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-default-signup-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-signup-layout.component.html',
  styleUrl: './default-signup-layout.component.scss'
})
export class DefaultSignupLayoutComponent {


  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;

  @Output("next") onNext = new EventEmitter();
  // @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  // submit(){
  //   this.onSubmit.emit()
  // }

  next() {
    this.onNext.emit(['interview']);
  }

  navigate() {
    this.onNavigate.emit(['login']);
  }

}