import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Invoice1Component } from './invoice1/invoice1.component';
import { LocalizeRouterModule } from 'localize-router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { Invoice2Component } from './invoice2/invoice2.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    data: {
      breadcrumb: 'breadcrumb.invoices.title'
    },
    children: [
      {
        path: '',
        component: InvoiceListComponent
      },
      {
        path: 'invoice1',
        component: Invoice1Component,
        data: {
          breadcrumb: 'breadcrumb.invoices.invoice1'
        }
      },
      {
        path: 'invoice2',
        component: Invoice2Component,
        data: {
          breadcrumb: 'breadcrumb.invoices.invoice2'
        }
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class InvoiceRoutingModule {
}
