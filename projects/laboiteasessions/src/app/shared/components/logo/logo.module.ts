import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [LogoComponent],
  exports: [LogoComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class LogoModule {
}
