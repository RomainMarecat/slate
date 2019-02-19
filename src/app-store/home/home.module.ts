import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from './header/header.module';
import { CategoryModule } from './category/category.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CategoryModule,
    CommonModule,
    HeaderModule,
    HomeRoutingModule,
    TranslateModule.forChild()
  ]
})
export class HomeModule {
}
