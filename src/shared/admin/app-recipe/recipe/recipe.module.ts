import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
import { RecipeAssociatedComponent } from './recipe-edit/recipe-associated/recipe-associated.component';
import { FormModule } from '../../../material/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageModule } from '../../../media/storage/storage.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    ColorPickerModule,
    DragDropModule,
    FlexLayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatListModule,
    MatCardModule,
    StorageModule,
    FormModule,
    NgxDatatableModule,

    NgPipesModule,
    NgSelectModule,
    ReactiveFormsModule,
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
    IngredientListComponent,
    RecipeAssociatedComponent
  ],
  providers: [
    ContrastService
  ]
})
export class RecipeModule {
}
