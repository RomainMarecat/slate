import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRecipeRoutingModule } from './app-recipe-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    AppRecipeRoutingModule,
    TranslateModule.forChild(),
  ],
})
export class AppRecipeModule {
}
