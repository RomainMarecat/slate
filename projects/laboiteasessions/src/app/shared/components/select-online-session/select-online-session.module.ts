import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { SelectOnlineSessionComponent } from './select-online-session.component';


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
