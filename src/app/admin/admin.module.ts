import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminGuard } from './../shared/guard/admin.guard';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    AdminRoutingModule
  ],
  declarations: [HomeComponent, ProductListComponent, ProductComponent],
  providers: [
    AdminGuard
  ]
})
export class AdminModule {}
