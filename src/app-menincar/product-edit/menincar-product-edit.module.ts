import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductEditRoutingModule } from './product-edit-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductEditRoutingModule
  ],
  declarations: [ProductEditComponent]
})
export class MenincarProductEditModule { }
