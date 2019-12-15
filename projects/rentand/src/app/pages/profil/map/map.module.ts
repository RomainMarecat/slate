import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderModule } from '../../../shared/components/loader/loader.module';
import { SelectCityTeachedModule } from '../../../shared/components/select-city-teached/select-city-teached.module';
import { MapComponent } from './map.component';



@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [
    CommonModule,
    LoaderModule,
    SelectCityTeachedModule
  ]
})
export class MapModule { }
