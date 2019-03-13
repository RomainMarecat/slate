import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPaymentComponent } from './cart-payment/cart-payment.component';
import { UserGuard } from '../guard/user.guard';
import { CartComponent } from './cart/cart.component';
import { LocalizeRouterModule } from 'localize-router';
import { CartWrapperComponent } from './cart-wrapper/cart-wrapper.component';
import { CartConfirmationComponent } from './cart-confirmation/cart-confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    children: [
      {
        path: '',
        component: CartWrapperComponent
      },
      {
        path: 'connection',
        component: CartWrapperComponent,
        pathMatch: 'full'
      },
      {
        path: 'payment',
        component: CartWrapperComponent,
        pathMatch: 'full'
      },
      {
        path: 'confirmation',
        component: CartWrapperComponent,
        pathMatch: 'full'
      },
      {
        path: 'delivery',
        component: CartWrapperComponent,
        pathMatch: 'full'
      },
      {
        path: 'order/:key',
        component: CartConfirmationComponent,
        pathMatch: 'full'
      },
      {
        path: ':key/payment',
        canActivate: [UserGuard],
        component: CartPaymentComponent
      },
    ]
  },
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
export class CartRoutingModule {
}
