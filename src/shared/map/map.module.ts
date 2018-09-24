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

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MapRoutingModule,
    NgArrayPipesModule,
    TranslateModule,
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
    MapService,
    AreaService,
    GeocodeService
  ]
})
export class MapModule {
}
