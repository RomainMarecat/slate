import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { NgxEditorModule } from 'ngx-editor';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from './../shared/product/product.service';
import { CategoryService } from './../shared/navigation/category/category.service';
import { SharedModule } from '../../shared.module';
import { VariantService } from '../../variant/variant.service';

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
    VariantService,
  ]
})
export class ProductModule {}
