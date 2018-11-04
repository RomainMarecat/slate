import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatStepperModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecipeInformationComponent } from './recipe-detail/recipe-information/recipe-information.component';
import { RecipePreparationListComponent } from './recipe-detail/recipe-preparation-list/recipe-preparation-list.component';
import { RecipeInstructionListComponent } from './recipe-detail/recipe-instruction-list/recipe-instruction-list.component';
import { RecipeTitleComponent } from './recipe-detail/recipe-title/recipe-title.component';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollModule } from 'shared/scroll/scroll.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RecipeRoutingModule,
    ScrollModule.forRoot(),
    TranslateModule.forChild()
  ],
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeInformationComponent,
    RecipePreparationListComponent,
    RecipeInstructionListComponent,
    RecipeTitleComponent
  ],
  exports: [
    RecipeListComponent,
  ]
})
export class RecipeModule {
}
