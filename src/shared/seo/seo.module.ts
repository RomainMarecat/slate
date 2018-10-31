import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from './shared/seo.service';
import { MenuModule } from '../menu/menu.module';
import { MenuService } from '../menu/menu.service';

@NgModule({
  imports: [
    CommonModule,
    MenuModule
  ],
  providers: [
    SeoService,
    MenuService
  ]
})
export class SeoModule {
}
