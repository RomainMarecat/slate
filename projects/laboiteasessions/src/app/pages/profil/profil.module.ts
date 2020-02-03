import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AgendaModule } from '../../shared/components/agenda/agenda.module';
import { LoaderModule } from '../../shared/components/loader/loader.module';
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
  ]
})
export class ProfilModule {
}
