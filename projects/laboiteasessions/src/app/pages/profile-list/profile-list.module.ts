import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileListRoutingModule } from './profile-list-routing.module';
import { ProfileListComponent } from './profile-list.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { SelectSportModule } from '../../shared/components/select-sport/select-sport.module';
import { NgArrayPipesModule } from 'ngx-pipes';
import { SelectLanguageModule } from '../../shared/components/select-language/select-language.module';
import { SelectDateModule } from '../../shared/components/select-date/select-date.module';
import { SelectCityTeachedModule } from '../../shared/components/select-city-teached/select-city-teached.module';
import { SelectCityModule } from '../../shared/components/select-city/select-city.module';


@NgModule({
  declarations: [
    ProfileListComponent
  ],
  imports: [
    CommonModule,
    SelectSportModule,
    PipesModule,
    ProfileListRoutingModule,
    NgArrayPipesModule,
    SelectLanguageModule,
    SelectDateModule,
    SelectCityTeachedModule,
    SelectCityModule
  ]
})
export class ProfileListModule {
}
