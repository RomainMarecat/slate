import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedFirebaseAgendaModule } from '../../shared/agenda/shared-firebase-agenda.module';
import { CmsModule } from '../../shared/cms/cms.module';
import { SharedContactModule } from '../../shared/contact/shared.contact.module';
import { SharedMapModule } from '../../shared/map/shared-map.module';
import { MenuService } from '../../shared/menu/menu.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../environments/environment';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey
    }),
    SharedFirebaseAgendaModule,
    CommonModule,
    SharedContactModule,
    SharedMapModule,
    CmsModule,
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
