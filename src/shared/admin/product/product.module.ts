import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { NgxEditorModule } from 'ngx-editor';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryService } from '../../category/category.service';
import { SharedModule } from '../../shared.module';
import { AttributeService } from '../../attribute/attribute.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductImageOrderComponent } from './product-image-order/product-image-order.component';
import { OfferService } from '../shared/offer/offer.service';
import { ProductOffersComponent } from './product-offers/product-offers.component';
import { PartnerService } from '../../partner/partner.service';
import { ProductService } from '../../product/shared/product.service';
import { MediaService } from '../../media/media.service';

export const TABLE_ATTRIBUTE = new InjectionToken<string>('attribute');
export const TABLE_OFFER = new InjectionToken<string>('offer');
export const TABLE_CATEGORY = new InjectionToken<string>('category');
export const TABLE_PARTNER = new InjectionToken<string>('partner');
export const TABLE_PRODUCT = new InjectionToken<string>('product');
export const TABLE_MEDIA = new InjectionToken<string>('media');

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule,
    NgxEditorModule,
    TranslateModule.forChild(),
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
    {provide: TABLE_ATTRIBUTE, useValue: 'attribute'},
    {provide: TABLE_OFFER, useValue: 'offer'},
    {provide: TABLE_CATEGORY, useValue: 'category'},
    {provide: TABLE_PARTNER, useValue: 'partner'},
    {provide: TABLE_PRODUCT, useValue: 'product'},
    {provide: TABLE_MEDIA, useValue: 'media'},
    {provide: MediaService, useClass: MediaService, deps: [AngularFirestore, TABLE_MEDIA]},
    {provide: AttributeService, useClass: AttributeService, deps: [AngularFirestore, TABLE_ATTRIBUTE]},
    {provide: PartnerService, useClass: PartnerService, deps: [AngularFirestore, TABLE_PARTNER]},
    {provide: OfferService, useClass: OfferService, deps: [AngularFirestore, TABLE_OFFER]},
    {provide: CategoryService, useClass: CategoryService, deps: [AngularFirestore, TABLE_CATEGORY]},
    {provide: ProductService, useClass: ProductService, deps: [AngularFirestore, TABLE_PRODUCT]},

  ]
})
export class ProductModule {
}
