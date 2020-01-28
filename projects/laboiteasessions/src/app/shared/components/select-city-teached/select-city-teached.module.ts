import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SelectCityTeachedComponent } from './select-city-teached.component';


@NgModule({
  declarations: [SelectCityTeachedComponent],
  exports: [SelectCityTeachedComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class SelectCityTeachedModule {
}
