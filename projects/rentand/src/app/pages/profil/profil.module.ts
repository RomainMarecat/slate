import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgArrayPipesModule, NgStringPipesModule } from 'ngx-pipes';
import { AgendaModule } from '../../shared/components/agenda/agenda.module';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { MaterialFactoryModule } from '../../shared/components/material/material-factory.module';
import { SelectAgeModule } from '../../shared/components/select-age/select-age.module';
import { SelectCityTeachedModule } from '../../shared/components/select-city-teached/select-city-teached.module';
import { SelectDurationModule } from '../../shared/components/select-duration/select-duration.module';
import { SelectLevelModule } from '../../shared/components/select-level/select-level.module';
import { SelectMeetingPointModule } from '../../shared/components/select-meeting-point/select-meeting-point.module';
import { SelectNumberParticipantModule } from '../../shared/components/select-number-participant/select-number-participant.module';
import { SelectOnlineSessionModule } from '../../shared/components/select-online-session/select-online-session.module';
import { SelectSportTeachedModule } from '../../shared/components/select-sport-teached/select-sport-teached.module';
import { ParameterService } from '../../shared/parameter/parameter.service';
import { CityTeachedService } from '../../shared/services/city-teached.service';
import { CityService } from '../../shared/services/city.service';
import { CountryService } from '../../shared/services/country.service';

import { DeviceService } from '../../shared/services/device.service';
import { EventsService } from '../../shared/services/events.service';
import { GoogleApisService } from '../../shared/services/google-apis.service';
import { UserService } from '../../shared/services/user.service';
import { OnlineSessionService } from '../../shared/services/online-session.service';
import { ProfilService } from '../../shared/services/profil.service';
import { SportTeachedService } from '../../shared/services/sport-teached.service';
import { ToastService } from '../../shared/services/toast.service';
import { CartService } from '../cart/shared/cart.service';
import { CartModule } from './cart/cart.module';
import { MapModule } from './map/map.module';
import { NavigationModule } from './navigation/navigation.module';
import { NotFoundModule } from './not-found/not-found.module';
import { OverviewModule } from './overview/overview.module';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';

@NgModule({
  imports: [
    CommonModule,
    ProfilRoutingModule,
    LoaderModule,
    MapModule,
    OverviewModule,
    AgendaModule,
    CartModule,
    NotFoundModule,
    NavigationModule,
    MatCardModule
  ],
  declarations: [
    ProfilComponent,
  ],
  providers: [
    GoogleApisService,
    CityTeachedService,
    CityService,
    SportTeachedService,
    OnlineSessionService,
    UserService,
    ToastService,
    CartService,
    ProfilService,
    EventsService,
    ParameterService,
    CountryService,
    DeviceService
  ]
})
export class ProfilModule {
}
