import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDeliveryComponent } from './cart-delivery.component';


const routes: Routes = [{
  path: 'cart/delivery',
  component: CartDeliveryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartDeliveryRoutingModule {
}
