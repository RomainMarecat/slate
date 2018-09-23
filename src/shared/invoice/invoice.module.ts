import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { Invoice1Component } from './invoice1/invoice1.component';
import { Invoice2Component } from './invoice2/invoice2.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    InvoiceRoutingModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    Invoice1Component,
    Invoice2Component,
    InvoiceListComponent],
  exports: [
    Invoice1Component,
    Invoice2Component
  ],
})
export class InvoiceModule {
}
