import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../environments/environment.blog';
import { AgmCoreModule } from '@agm/core';
import { MenuService } from '../../shared/menu/menu.service';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey
    }),
    CommonModule,
    SharedModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [
    MenuService
  ]
})
export class HomeModule { }
