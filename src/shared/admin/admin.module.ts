import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminGuard } from '../guard/admin.guard';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    AdminRoutingModule,
    TranslateModule,
  ],
  declarations: [HomeComponent],
  providers: [
    AdminGuard
  ]
})
export class AdminModule {}
