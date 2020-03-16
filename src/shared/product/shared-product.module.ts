import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Angulartics2Module } from 'angulartics2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderModule } from '../loader/loader.module';
import { MediaModule } from '../media/media.module';
import { NgStringPipesModule } from 'ngx-pipes';
import { TranslateModule } from '@ngx-translate/core';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemCardComponent } from './product-item-card/product-item-card.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductFormComponent } from './product-add/product-form/product-form.component';
import { ProductPreviewComponent } from './product-add/product-preview/product-preview.component';
import { ProductActionComponent } from './product-action/product-action.component';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { CommentModule } from '../comment/comment.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    CommentModule,
    FormsModule,
    FlexLayoutModule,
    LoaderModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatBadgeModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MediaModule,
    NgStringPipesModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    RouterModule,
    LocalizeRouterModule
  ],
  declarations: [
    ProductSearchComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemCardComponent,
    ProductItemComponent,
    ProductAddComponent,
    ProductFormComponent,
    ProductPreviewComponent,
    ProductActionComponent,
    ProductComponent,
  ],
  exports: [
    ProductSearchComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemCardComponent,
    ProductItemComponent,
    ProductAddComponent,
    ProductFormComponent,
    ProductPreviewComponent,
    ProductActionComponent,
  ],
})
export class SharedProductModule {
}
