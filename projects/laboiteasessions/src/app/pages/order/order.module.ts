import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrderComponent } from './order/order.component';
import { NgPipesModule } from 'ngx-pipes';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    OrderItemComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    NgPipesModule,
    FlexLayoutModule,
    MatIconModule,
    OrderRoutingModule,
    TranslateModule.forChild()
  ]
})
export class OrderModule {
}
