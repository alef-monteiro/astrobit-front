import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

type InputTypes = "text" | "password" | "email" | "password_confirmation" | "link";

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true
    }],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss'
})

export class PrimaryInputComponent implements ControlValueAccessor {
  @Input() type: InputTypes = "text";
  @Input() label: string = "";
  @Input() inputName: string = "";
  @Input() placeholder: string = "";


  // não entendi esta parte sobre o problema com formControlName em está conectado com um pai
  value: string = "";
  onChange: any = () => {  }
  onTouched: any = () => {  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean) {
  }
}
