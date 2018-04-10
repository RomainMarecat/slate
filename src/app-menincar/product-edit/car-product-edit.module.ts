import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductEditRoutingModule } from './product-edit-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { NgArrayPipesModule, RangePipe } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    NgArrayPipesModule,
    SharedModule,
    ProductEditRoutingModule
  ],
  declarations: [ProductEditComponent],
  providers: [RangePipe]
})
export class CarProductEditModule { }
ùù
