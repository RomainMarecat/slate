import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from '../../environments/environment.hockey';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailRoutingModule } from './product-detail-routing.module';

@NgModule({
  imports: [
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
      developerMode: true,
      pageTracking: {
        clearIds: true,
      },
    }),
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    ProductDetailRoutingModule
  ],
  declarations: [
    ProductDetailComponent
  ]
})
export class ProductDetailModule {}
