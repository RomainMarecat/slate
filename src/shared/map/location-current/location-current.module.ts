import { AgmCoreModule } from '@agm/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TranslateModule } from '@ngx-translate/core';
import { ServerLeafletModule } from '../server-leaflet.module';
import { LocationCurrentComponent } from './location-current.component';

@NgModule({
  declarations: [
    LocationCurrentComponent
  ],
  exports: [
    LocationCurrentComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule,
    CommonModule,
    FlexLayoutModule,
    LeafletModule.forRoot(),
    TranslateModule.forChild(),
    RouterModule,
  ]
})
export class LocationCurrentModule {
}
