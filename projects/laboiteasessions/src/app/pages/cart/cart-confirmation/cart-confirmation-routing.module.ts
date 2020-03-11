import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartConfirmationComponent } from './cart-confirmation.component';


const routes: Routes = [
  {
    path: 'order/confirmation/:id',
    component: CartConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartConfirmationRoutingModule {
}
