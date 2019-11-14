import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgArrayPipesModule } from 'ngx-pipes';
import { AreaDrawComponent } from './area-draw/area-draw.component';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaComponent } from './area/area.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AreaComponent,
    MapComponent,
    AreaListComponent,
    AreaDrawComponent,
  ],
  exports: [
    AreaComponent,
    MapComponent,
    AreaListComponent,
    AreaDrawComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    NgArrayPipesModule,
    RouterModule,
    FlexLayoutModule
  ]
})
export class MapAreaModule {
}
