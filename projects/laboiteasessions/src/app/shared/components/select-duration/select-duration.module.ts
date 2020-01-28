import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SelectDurationComponent } from './select-duration.component';


@NgModule({
  declarations: [SelectDurationComponent],
  exports: [SelectDurationComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule
  ]
})
export class SelectDurationModule {
}
