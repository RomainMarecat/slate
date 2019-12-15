import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class FooterModule {
}
