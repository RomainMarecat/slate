import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from '../../environments/environment.hockey';
import { NgStringPipesModule } from 'angular-pipes';
import { SharedModule } from '../../core/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

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
    NgStringPipesModule,
    RouterModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [
    ProductListComponent,
    ProductItemComponent
  ]
})
export class ProductListModule {}
