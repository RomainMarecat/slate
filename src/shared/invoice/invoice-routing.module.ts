import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Invoice1Component } from './invoice1/invoice1.component';
import { InvoiceListComponent } from 'shared/invoice/invoice-list/invoice-list.component';
import { Invoice2Component } from 'shared/invoice/invoice2/invoice2.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {path: '', component: InvoiceListComponent},
  {path: 'invoice1', component: Invoice1Component},
  {path: 'invoice2', component: Invoice2Component}
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
