import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductActionComponent } from './product-action/product-action.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProductListRoutingModule } from './product-list-routing.module';

@NgModule({
  imports: [
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ], {
      developerMode: true,
      pageTracking: {
        clearIds: true,
      },
    }),
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    ProductListRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductActionComponent,
    ProductItemComponent,
    ProductFilterComponent
  ]
})
export class ProductListModule {
}
