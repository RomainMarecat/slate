import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgArrayPipesModule } from 'ngx-pipes';
import { MapRoutingModule } from './map-routing.module';
import { SharedMapModule } from './shared-map.module';
import { AreaService } from './shared/area.service';
import { GeocodeService } from './shared/geocode.service';
import { MapService } from './shared/map.service';

export const TABLE_AREA = new InjectionToken<string>('area');
export const TABLE_MAP = new InjectionToken<string>('map');

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MapRoutingModule,
    NgArrayPipesModule,
    SharedMapModule,
    TranslateModule.forChild(),
    RouterModule
  ],
  exports: [
    SharedMapModule,
  ],
  providers: [
    {provide: TABLE_AREA, useValue: 'area'},
    {provide: TABLE_MAP, useValue: 'map'},
    {provide: MapService, useClass: MapService, deps: [AngularFirestore, TABLE_MAP]},
    {provide: AreaService, useClass: AreaService, deps: [AngularFirestore, TABLE_AREA]},
    GeocodeService
  ]
})
export class MapModule {
}
