import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CarouselConfig, CarouselModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CarouselModule.forRoot(),
    TranslateModule.forChild(),
    LocalizeRouterModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {provide: CarouselConfig, useValue: {interval: 5000, noPause: true, showIndicators: true}}
  ]
})
export class HeaderModule {
}
