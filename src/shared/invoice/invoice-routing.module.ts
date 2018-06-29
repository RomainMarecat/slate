import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Invoice1Component } from './invoice1/invoice1.component';
import { InvoiceListComponent } from 'shared/invoice/invoice-list/invoice-list.component';
import { Invoice2Component } from 'shared/invoice/invoice2/invoice2.component';

const routes: Routes = [
  {path: 'invoices', component: InvoiceListComponent},
  {path: 'invoices/invoice1', component: Invoice1Component},
  {path: 'invoices/invoice2', component: Invoice2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {
}
