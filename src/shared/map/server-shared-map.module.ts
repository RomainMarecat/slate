import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UniversalService } from '../universal/universal.service';
import { ServerLocationCurrentModule } from './location-current/server-location-current.module';
import { MapAreaModule } from './map-area.module';
import { ServerLeafletModule } from './server-leaflet.module';
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
    TranslateModule.forChild(),
    MapAreaModule,
    RouterModule,
    ServerLocationCurrentModule,
    ServerLeafletModule,
  ],
  exports: [
    MapAreaModule,
    ServerLocationCurrentModule,
    ServerLeafletModule,
  ],
  providers: [
    {provide: TABLE_AREA, useValue: 'area'},
    {provide: TABLE_MAP, useValue: 'map'},
    {provide: MapService, useClass: MapService, deps: [AngularFirestore, TABLE_MAP, UniversalService]},
    {provide: AreaService, useClass: AreaService, deps: [AngularFirestore, TABLE_AREA]},
    GeocodeService
  ]
})
export class ServerSharedMapModule {
}
