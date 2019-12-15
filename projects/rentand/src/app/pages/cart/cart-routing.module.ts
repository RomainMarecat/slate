import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { CartComponent } from './cart.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        override: true,
        title: 'Votre panier - rentand',
        description: 'Réservez votre session'
      }
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CartRoutingModule {
}
