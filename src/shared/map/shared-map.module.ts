import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TranslateModule } from '@ngx-translate/core';
import { UniversalService } from '../universal/universal.service';
import { LocationCurrentModule } from './location-current/location-current.module';
import { MapAreaModule } from './map-area.module';
import { AreaService } from './shared/area.service';
import { GeocodeService } from './shared/geocode.service';
import { MapService } from './shared/map.service';

export const TABLE_AREA = new InjectionToken<string>('area');
export const TABLE_MAP = new InjectionToken<string>('map');

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    TranslateModule.forChild(),
    MapAreaModule,
    LocationCurrentModule,
    LeafletModule.forRoot(),
  ],
  exports: [
    MapAreaModule,
    LocationCurrentModule,
    LeafletModule,
  ],
  providers: [
    {provide: TABLE_AREA, useValue: 'area'},
    {provide: TABLE_MAP, useValue: 'map'},
    {provide: MapService, useClass: MapService, deps: [AngularFirestore, TABLE_MAP, UniversalService]},
    {provide: AreaService, useClass: AreaService, deps: [AngularFirestore, TABLE_AREA]},
    GeocodeService
  ]
})
export class SharedMapModule {
}
