import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordResetFormModule } from '../password-reset-form/password-reset-form.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  entryComponents: [LoginComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    PasswordResetFormModule,
    LoginRoutingModule
  ]
})
export class LoginModule {
}
