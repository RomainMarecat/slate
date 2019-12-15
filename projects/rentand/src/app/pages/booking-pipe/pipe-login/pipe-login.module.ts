import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecurityModule } from '../../security/security.module';
import { PipeLoginComponent } from './pipe-login.component';

@NgModule({
  declarations: [
    PipeLoginComponent
  ],
  exports: [
    PipeLoginComponent
  ],
  imports: [
    CommonModule,
    SecurityModule,
  ]
})
export class PipeLoginModule {
}
