import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from '../recipe-list/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatStepperModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecipeInformationComponent } from './recipe-detail/recipe-information/recipe-information.component';
import { RecipePreparationListComponent } from './recipe-detail/recipe-preparation-list/recipe-preparation-list.component';
import { RecipeInstructionListComponent } from './recipe-detail/recipe-instruction-list/recipe-instruction-list.component';
import { RecipeTitleComponent } from './recipe-detail/recipe-title/recipe-title.component';
import { ScrollModule } from '../../../shared/scroll/scroll.module';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MediaModule } from '../../../shared/media/media.module';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { NgPipesModule } from 'ngx-pipes';
import { RecipeSharedListModule } from '../recipe-list/recipe-list/recipe-shared-list.module';

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
    RecipeRoutingModule,
    ScrollingModule,
    ScrollModule.forRoot(),
    MediaModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    RecipeDetailComponent,
    RecipeInformationComponent,
    RecipePreparationListComponent,
    RecipeInstructionListComponent,
    RecipeTitleComponent,
  ],
})
export class RecipeModule {
}
