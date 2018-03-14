import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area/area.component';
import { MapComponent } from './map/map.component';
import { MapService } from './shared/map.service';
import { AreaService } from './shared/area.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    AreaComponent,
    MapComponent
  ],
  exports: [
    AreaComponent,
    MapComponent
  ],
  providers: [
    MapService,
    AreaService
  ]
})
export class MapModule {
}
