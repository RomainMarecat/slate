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
import { ColorPickerModule } from 'ngx-color-picker';
import { InstructionEditComponent } from './recipe-edit/instruction-edit/instruction-edit.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { IngredientEditComponent } from './recipe-edit/ingredient-edit/ingredient-edit.component';
import { PreparationEditComponent } from './recipe-edit/preparation-edit/preparation-edit.component';
import { IngredientListComponent } from './recipe-edit/ingredient-list/ingredient-list.component';
import { ContrastService } from '../../../contrast/contrast.service';
import { NgPipesModule } from 'ngx-pipes';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    ColorPickerModule,
    DragDropModule,
    FlexLayoutModule,
    NgxDatatableModule,
    SharedModule,
    NgxEditorModule,
    NgPipesModule,
    NgSelectModule,
    RecipeRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    RecipeListComponent,
    RecipeEditComponent,
    RecipeComponent,
    InstructionEditComponent,
    IngredientEditComponent,
    PreparationEditComponent,
    IngredientListComponent
  ],
  providers: [
    ContrastService
  ]
})
export class RecipeModule {
}
