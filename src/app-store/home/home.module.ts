import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from './header/header.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductService } from '../../shared/product/shared/product.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoryService } from '../../shared/category/category.service';
import { MockCategoryService } from '../../shared/category/mock-category.service';
import { MockProductService } from '../../shared/product/shared/mock-product.service';
import { FavoriteService } from '../../shared/favorite/shared/favorite.service';

export const TABLE_EVENT = new InjectionToken<string>('event');
export const TABLE_ARTICLE = new InjectionToken<string>('article');
export const TABLE_AREA = new InjectionToken<string>('area');
export const TABLE_CART = new InjectionToken<string>('cart');
export const TABLE_PRODUCT = new InjectionToken<string>('product');
export const TABLE_CONTACT = new InjectionToken<string>('contact');
export const TABLE_CATEGORY = new InjectionToken<string>('category');
export const TABLE_SELECTION = new InjectionToken<string>('selection');
export const TABLE_SESSION = new InjectionToken<string>('session');
export const TABLE_SCORE = new InjectionToken<string>('score');
export const TABLE_COMMENT = new InjectionToken<string>('comment');
export const TABLE_CMS = new InjectionToken<string>('cms');
export const TABLE_CMS_DETAIL = new InjectionToken<string>('cms-detail');
export const TABLE_MEDIA = new InjectionToken<string>('media');
export const TABLE_POST = new InjectionToken<string>('post');
export const TABLE_ATTRIBUTE = new InjectionToken<string>('attribute');
export const TABLE_MAP = new InjectionToken<string>('map');
export const TABLE_OFFER = new InjectionToken<string>('offer');
export const TABLE_ORDER = new InjectionToken<string>('order');
export const TABLE_PARTNER = new InjectionToken<string>('partner');
export const TABLE_PAYMENT = new InjectionToken<string>('payment');
export const TABLE_FAVORITE = new InjectionToken<string>('favorite');

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CategoryModule,
    ProductModule,
    CommonModule,
    HeaderModule,
    HomeRoutingModule,
    TranslateModule.forChild()
  ],
  providers: [
    {provide: TABLE_ARTICLE, useValue: 'article'},
    {provide: TABLE_AREA, useValue: 'area'},
    {provide: TABLE_ATTRIBUTE, useValue: 'attribute'},
    {provide: TABLE_CART, useValue: 'cart'},
    {provide: TABLE_CONTACT, useValue: 'contact'},
    {provide: TABLE_CATEGORY, useValue: 'category'},
    {provide: TABLE_COMMENT, useValue: 'comment'},
    {provide: TABLE_CMS, useValue: 'cms'},
    {provide: TABLE_CMS_DETAIL, useValue: 'cms-detail'},
    {provide: TABLE_EVENT, useValue: 'event'},
    {provide: TABLE_MAP, useValue: 'map'},
    {provide: TABLE_MEDIA, useValue: 'media'},
    {provide: TABLE_OFFER, useValue: 'offer'},
    {provide: TABLE_ORDER, useValue: 'order'},
    {provide: TABLE_POST, useValue: 'post'},
    {provide: TABLE_PARTNER, useValue: 'partner'},
    {provide: TABLE_PAYMENT, useValue: 'payment'},
    {provide: TABLE_PRODUCT, useValue: 'product'},
    {provide: TABLE_FAVORITE, useValue: 'favorite'},
    {provide: TABLE_SELECTION, useValue: 'selection'},
    {provide: TABLE_SESSION, useValue: 'session'},
    {provide: TABLE_SCORE, useValue: 'scores'},
    {provide: ProductService, useClass: ProductService, deps: [AngularFirestore, TABLE_PRODUCT]},
    {provide: CategoryService, useClass: CategoryService, deps: [AngularFirestore, TABLE_CATEGORY]},
    {provide: FavoriteService, useClass: FavoriteService, deps: [AngularFirestore, TABLE_FAVORITE]},
    {provide: CategoryService, useClass: MockCategoryService}, // @todo to remove
    {provide: ProductService, useClass: MockProductService}, // @todo to remove
  ]
})
export class HomeModule {
}
