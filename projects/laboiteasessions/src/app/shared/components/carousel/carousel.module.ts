import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { NguCarouselModule } from '@ngu/carousel';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [CarouselComponent],
  exports: [CarouselComponent],
  imports: [
    CommonModule,
    MatIconModule,
    NguCarouselModule,
    RouterModule
  ]
})
export class CarouselModule {
}
