import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent, PasswordResetDialogComponent } from './login/login.component';
import { SecurityComponent } from './security.component';
import { SecurityRoutingModule } from './security.routing.module';
import { SignupComponent } from './signup/signup.component';


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
    MatButtonModule
  ],
  declarations: [
    SecurityComponent,
    LoginComponent,
    SignupComponent,
    PasswordResetDialogComponent
  ],
  entryComponents: [
    PasswordResetDialogComponent
  ],
  exports: [
    SecurityComponent
  ]
})
export class SecurityModule {
}
