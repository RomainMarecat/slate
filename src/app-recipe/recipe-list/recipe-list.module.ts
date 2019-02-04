import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeListRoutingModule } from './recipe-list-routing.module';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatStepperModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollModule } from '../../shared/scroll/scroll.module';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { NgPipesModule } from 'ngx-pipes';
import { RecipeSharedListModule } from './recipe-list/recipe-shared-list.module';
import { MediaModule } from '../../shared/media/media.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatCardModule,
    NgxJsonLdModule,
    NgPipesModule,
    PlatformModule,
    RecipeSharedListModule,
    RecipeListRoutingModule,
    ScrollingModule,
    ScrollModule.forRoot(),
    MediaModule,
    TranslateModule.forChild(),
  ],
})
export class RecipeListModule {
}
