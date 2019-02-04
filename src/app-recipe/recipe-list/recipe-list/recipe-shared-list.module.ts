import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatStepperModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { NgPipesModule } from 'ngx-pipes';
import { ScrollModule } from '../../../shared/scroll/scroll.module';
import { MediaModule } from '../../../shared/media/media.module';
import { RecipeListComponent } from './recipe-list.component';

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
    ScrollingModule,
    ScrollModule.forRoot(),
    MediaModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    RecipeListComponent,
  ],
  exports: [
    RecipeListComponent,
  ]
})
export class RecipeSharedListModule {
}
