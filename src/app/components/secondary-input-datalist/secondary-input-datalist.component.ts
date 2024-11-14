import { Component, forwardRef, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-secondary-input-datalist',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SecondaryInputDatalistComponent),
      multi: true
    }],
  templateUrl: './secondary-input-datalist.component.html',
  styleUrls: ['./secondary-input-datalist.component.scss'] // Corrigido styleUrl para styleUrls
})
export class SecondaryInputDatalistComponent implements ControlValueAccessor {
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() inputName: string = "";

  subjectList: any[] = [];

  ngOnInit() {
    // Colocar metodo httpList
    this.subjectList = [
      {
        name: "Math",
        id: "1"
      },
      {
        name: "Curiosities",
        id: "2"
      },
      {
        name: "English",
        id: "3"
      },
    ];
  }

  value: string = "";
  onChange: any = () => {};
  onTouched: any = () => {};

  // Função para capturar seleção no select
  onInput(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.onChange(value);

    console.log(value);
  }


  // Implementações do ControlValueAccessor
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }
}
