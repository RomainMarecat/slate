import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';

import { PasswordResetFormRoutingModule } from './password-reset-form-routing.module';
import { PasswordResetFormComponent } from './password-reset-form.component';


@NgModule({
  declarations: [PasswordResetFormComponent],
  entryComponents: [PasswordResetFormComponent],
  exports: [PasswordResetFormComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordResetFormRoutingModule
  ]
})
export class PasswordResetFormModule {
}
