import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from '../../environments/environment.hockey';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProductListRoutingModule } from './product-list-routing.module';

@NgModule({
  imports: [
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
      developerMode: true,
      pageTracking: {
        clearIds: true,
      },
    }),
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    ProductListRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductItemComponent
  ]
})
export class ProductListModule {}
