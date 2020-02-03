import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SelectNumberParticipantComponent } from './select-number-participant.component';


@NgModule({
  declarations: [SelectNumberParticipantComponent],
  exports: [SelectNumberParticipantComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class SelectNumberParticipantModule {
}
