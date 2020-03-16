import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SelectOnlineSessionComponent } from './select-online-session.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [SelectOnlineSessionComponent],
  exports: [SelectOnlineSessionComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SelectOnlineSessionModule {
}
