import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminGuard } from '../guard/admin.guard';
import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    AdminRoutingModule
  ],
  declarations: [HomeComponent],
  providers: [
    AdminGuard
  ]
})
export class AdminModule {}