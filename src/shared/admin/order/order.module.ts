import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClipboardModule } from 'ngx-clipboard';

import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared.module';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderListComponent } from './order-list/order-list.component';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    OrderRoutingModule,
    NgxDatatableModule,
    MaterialModule,
    ClipboardModule,
    SharedModule,

    TranslateModule.forChild(),
  ],
  declarations: [
    OrderListComponent,
    OrderEditComponent,
    OrderComponent
  ],
})
export class OrderModule {
}
