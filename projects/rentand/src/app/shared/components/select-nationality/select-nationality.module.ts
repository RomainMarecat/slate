import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SelectNationalityComponent } from './select-nationality.component';



@NgModule({
  declarations: [SelectNationalityComponent],
  exports: [SelectNationalityComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SelectNationalityModule { }
