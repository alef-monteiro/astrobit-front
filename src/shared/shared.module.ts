import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importe os módulos aqui

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,        // Importa o FormsModule aqui
    ReactiveFormsModule // Importa o ReactiveFormsModule aqui
  ],
  exports: [
    FormsModule,        // Exporte o FormsModule para ser usado em outros módulos
    ReactiveFormsModule // Exporte o ReactiveFormsModule
  ]
})
export class SharedModule { }
