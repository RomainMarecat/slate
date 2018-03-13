import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area/area.component';
import { MapComponent } from './map/map.component';
import { MapService } from './shared/map.service';

@NgModule({
  imports: [
    CommonModule,
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
    MapService
  ]
})
export class MapModule {
}
