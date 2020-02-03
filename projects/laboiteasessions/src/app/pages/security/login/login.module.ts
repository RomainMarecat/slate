import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { PasswordResetFormModule } from '../password-reset-form/password-reset-form.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatDialogModule } from '@angular/material/dialog';


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
