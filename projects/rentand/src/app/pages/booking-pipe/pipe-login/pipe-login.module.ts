import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecurityModule } from '../../security/security.module';
import { PipeLoginComponent } from './pipe-login.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    PipeLoginComponent
  ],
  exports: [
    PipeLoginComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    SecurityModule,
  ]
})
export class PipeLoginModule {
}
