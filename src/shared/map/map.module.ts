import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgArrayPipesModule } from 'ngx-pipes';
import { MapRoutingModule } from './map-routing.module';
import { SharedMapModule } from './shared-map.module';

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
  ]
})
export class MapModule {
}
