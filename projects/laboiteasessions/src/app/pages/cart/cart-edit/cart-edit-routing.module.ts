import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartEditComponent } from './cart-edit.component';


const routes: Routes = [
  {
    path: 'cart',
    component: CartEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartEditRoutingModule {
}
