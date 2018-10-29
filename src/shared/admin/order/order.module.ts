import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared.module';
import { NgxEditorModule } from 'ngx-editor';
import { TranslateModule } from '@ngx-translate/core';
import { OrderComponent } from './order/order.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    OrderRoutingModule,
    NgxDatatableModule,
    SharedModule,
    NgxEditorModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    OrderListComponent,
    OrderEditComponent,
    OrderComponent
  ]
})
export class OrderModule {
}
