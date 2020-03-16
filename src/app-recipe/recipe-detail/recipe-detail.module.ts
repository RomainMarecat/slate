import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecipeInformationComponent } from './recipe-detail/recipe-information/recipe-information.component';
import { RecipePreparationListComponent } from './recipe-detail/recipe-preparation-list/recipe-preparation-list.component';
import { RecipeInstructionListComponent } from './recipe-detail/recipe-instruction-list/recipe-instruction-list.component';
import { RecipeTitleComponent } from './recipe-detail/recipe-title/recipe-title.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { NgPipesModule } from 'ngx-pipes';
import { RecipeDetailRoutingModule } from './recipe-detail-routing.module';
import { ScrollModule } from '../../shared/scroll/scroll.module';
import { StorageModule } from '../../shared/media/storage/storage.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

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
    RecipeDetailRoutingModule,
    ScrollingModule,
    ScrollModule.forRoot(),
    StorageModule,
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
export class RecipeDetailModule {
}
