import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SelectMeetingPointComponent } from './select-meeting-point.component';


@NgModule({
  declarations: [SelectMeetingPointComponent],
  exports: [SelectMeetingPointComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class SelectMeetingPointModule {
}
