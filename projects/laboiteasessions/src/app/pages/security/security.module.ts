import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginModule } from './login/login.module';
import { PasswordResetFormModule } from './password-reset-form/password-reset-form.module';
import { SecurityComponent } from './security.component';
import { SecurityRoutingModule } from './security.routing.module';
import { SignupModule } from './signup/signup.module';


@NgModule({
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    LoginModule,
    SignupModule,
    PasswordResetFormModule
  ],
  declarations: [
    SecurityComponent,
  ],
  exports: [
    SecurityComponent
  ]
})
export class SecurityModule {
}
