import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminGuard } from './../shared/guard/admin.guard';
import { ProductService } from './shared/product/product.service';
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
import { ProductModule } from './product/product.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './navigation/category/category.module';
import { SelectionModule } from './navigation/selection/selection.module';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CategoryModule,
    ProductModule,
    SelectionModule,
    AdminRoutingModule
  ],
  declarations: [HomeComponent, ProductListComponent, ProductComponent],
  providers: [
    ProductService,
    AdminGuard
  ]
})
export class AdminModule {}
