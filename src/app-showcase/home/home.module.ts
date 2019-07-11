import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseAgendaModule } from '../../shared/agenda/firebase-agenda.module';
import { HomeComponent } from './home.component';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { MenuService } from '../../shared/menu/menu.service';
import { ContactModule } from '../../shared/contact/contact.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey
    }),
    FirebaseAgendaModule,
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
export class HomeModule {
}
