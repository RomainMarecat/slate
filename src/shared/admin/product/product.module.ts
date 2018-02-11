import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { NgxEditorModule } from 'ngx-editor';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from './../shared/product/product.service';
import { CategoryService } from './../shared/navigation/category/category.service';
import { SharedModule } from '../../shared.module';
import { AttributeService } from '../../attribute/attribute.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { DragulaModule } from 'ng2-dragula';

const TABLE_NAME = new InjectionToken < string > ('attribute');

@NgModule({
  imports: [
    CommonModule,
    DragulaModule,
    NgxDatatableModule,
    SharedModule,
    NgxEditorModule,
    TranslateModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductFilterComponent
  ],
  providers: [
    CategoryService,
    ProductService,
    { provide: TABLE_NAME, useValue: 'attribute' },
    { provide: AttributeService, useClass: AttributeService, deps: [AngularFirestore, TABLE_NAME] },

  ]
})
export class ProductModule {}
