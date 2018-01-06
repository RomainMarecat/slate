import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { NgStringPipesModule } from 'angular-pipes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from './../shared/product/product.service';
import { CategoryService } from './../shared/navigation/category/category.service';
import { SharedModule } from '../../shared.module';
import { MenuService } from '../../menu/menu.service';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule,
    NgxEditorModule,
    TranslateModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductAddComponent
  ],
  providers: [
    CategoryService,
    ProductService,
  ]
})
export class ProductModule {}
