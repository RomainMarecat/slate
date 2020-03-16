import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { Invoice1Component } from './invoice1/invoice1.component';
import { Invoice2Component } from './invoice2/invoice2.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InvoiceComponent } from './invoice/invoice.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

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
    InvoiceListComponent,
    InvoiceComponent],
  exports: [
    Invoice1Component,
    Invoice2Component
  ],
})
export class InvoiceModule {
}
