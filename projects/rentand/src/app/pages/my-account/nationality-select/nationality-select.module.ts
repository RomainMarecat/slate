import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NationalitySelectComponent } from './nationality-select.component';



@NgModule({
  declarations: [NationalitySelectComponent],
  exports: [NationalitySelectComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class NationalitySelectModule { }
