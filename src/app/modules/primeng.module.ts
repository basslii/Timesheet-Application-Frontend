import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
    DropdownModule,
  ],
  exports: [
    CheckboxModule,
    TableModule,
    ButtonModule,
    DropdownModule,
  ]
})
export class PrimengModule { }
