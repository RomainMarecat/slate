import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';
import { LogoModule } from '../../shared/components/logo/logo.module';

@NgModule({
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    LogoModule,
    RouterModule
  ]
})
export class FooterModule {
}
