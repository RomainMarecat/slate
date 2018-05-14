import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { MenuService } from '../../shared/menu/menu.service';
import { ContactModule } from '../../shared/contact/contact.module';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey
    }),
    CommonModule,
    ContactModule,
    SharedModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [
    MenuService
  ]
})
export class HomeModule { }
