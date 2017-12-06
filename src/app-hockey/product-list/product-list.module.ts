import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {Angulartics2Module} from 'angulartics2';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {SharedModule} from '../../core/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
      developerMode: true,
      pageTracking: {
        clearIds: true,
      },
    }),
    SharedModule
  ],
  declarations: [ProductListComponent, ProductItemComponent]
})
export class ProductListModule { }
