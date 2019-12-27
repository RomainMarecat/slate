import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SelectOnlineSessionComponent } from './select-online-session.component';


@NgModule({
  declarations: [SelectOnlineSessionComponent],
  exports: [SelectOnlineSessionComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SelectOnlineSessionModule {
}
