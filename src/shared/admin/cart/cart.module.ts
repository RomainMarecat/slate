import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxEditorModule } from 'ngx-editor';
import { MaterialModule } from '../../material/material.module';
import { CartEditComponent } from './cart-edit/cart-edit.component';
import { CartListComponent } from './cart-list/cart-list.component';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    CartComponent,
    CartEditComponent,
    CartListComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FlexLayoutModule,
    NgxDatatableModule,
    MaterialModule,
    ClipboardModule,
    NgxEditorModule,
    TranslateModule.forChild(),
  ]
})
export class CartModule {
}
