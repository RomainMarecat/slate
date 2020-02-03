import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { LogoModule } from '../../shared/components/logo/logo.module';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    LogoModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexModule
  ]
})
export class NavbarModule {
}
