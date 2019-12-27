import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SelectSportTeachedComponent } from './select-sport-teached.component';


@NgModule({
  declarations: [SelectSportTeachedComponent],
  exports: [SelectSportTeachedComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class SelectSportTeachedModule {
}
