import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { NgxEditorModule } from 'ngx-editor';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../shared/product/product.service';
import { CategoryService } from '../../category/category.service';
import { SharedModule } from '../../shared.module';
import { AttributeService } from '../../attribute/attribute.service';
import { PartnerService } from '../shared/partner/partner.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { DragulaModule } from 'ng2-dragula';
import { ProductImageOrderComponent } from './product-image-order/product-image-order.component';
import { OfferService } from '../shared/offer/offer.service';
import { ProductOffersComponent } from './product-offers/product-offers.component';

const TABLE_ATTRIBUTE = new InjectionToken < string > ('attribute');
const TABLE_OFFER = new InjectionToken < string > ('offer');
const TABLE_CATEGORY = new InjectionToken < string > ('category');
const TABLE_PARTNER = new InjectionToken < string > ('partner');

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
    ProductEditComponent,
    ProductFilterComponent,
    ProductImageOrderComponent,
    ProductOffersComponent
  ],
  providers: [
    CategoryService,
    ProductService,
    { provide: TABLE_ATTRIBUTE, useValue: 'attribute' },
    { provide: TABLE_OFFER, useValue: 'offer' },
    { provide: TABLE_CATEGORY, useValue: 'category' },
    { provide: TABLE_PARTNER, useValue: 'partner' },
    { provide: AttributeService, useClass: AttributeService, deps: [AngularFirestore, TABLE_ATTRIBUTE] },
    { provide: PartnerService, useClass: PartnerService, deps: [AngularFirestore, TABLE_PARTNER] },
    { provide: OfferService, useClass: OfferService, deps: [AngularFirestore, TABLE_OFFER] },
    { provide: CategoryService, useClass: CategoryService, deps: [AngularFirestore, TABLE_CATEGORY] },

  ]
})
export class ProductModule {}
