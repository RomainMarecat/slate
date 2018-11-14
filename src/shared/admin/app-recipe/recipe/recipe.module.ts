import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../../shared.module';
import { NgxEditorModule } from 'ngx-editor';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxDatatableModule,
    SharedModule,
    NgxEditorModule,
    RecipeRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    RecipeListComponent,
    RecipeEditComponent,
    RecipeComponent
  ]
})
export class RecipeModule {
}
