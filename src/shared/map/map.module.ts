import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area/area.component';
import { MapComponent } from './map/map.component';
import { MapService } from './shared/map.service';
import { AreaService } from './shared/area.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaDrawComponent } from './area-draw/area-draw.component';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { GeocodeService } from './shared/geocode.service';
import { NgArrayPipesModule } from 'ngx-pipes';
import { LocationCurrentComponent } from './location-current/location-current.component';
import { AgmCoreModule } from '@agm/core';
import { MapRoutingModule } from './map-routing.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { TABLE_AREA, TABLE_MAP } from '../../app-alr/core/core.module';

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MapRoutingModule,
    NgArrayPipesModule,
    TranslateModule.forChild(),
    RouterModule,
  ],
  declarations: [
    AreaComponent,
    MapComponent,
    AreaListComponent,
    AreaDrawComponent,
    LocationCurrentComponent
  ],
  exports: [
    AreaComponent,
    MapComponent,
    AreaListComponent,
    AreaDrawComponent,
    LocationCurrentComponent
  ],
  providers: [
    {provide: TABLE_AREA, useValue: 'area'},
    {provide: TABLE_MAP, useValue: 'map'},
    {provide: MapService, useClass: MapService, deps: [AngularFirestore, TABLE_MAP]},
    {provide: AreaService, useClass: AreaService, deps: [AngularFirestore, TABLE_AREA]},
    AreaService,
    GeocodeService
  ]
})
export class MapModule {
}
