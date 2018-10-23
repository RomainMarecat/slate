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
  MatCardModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { AdminComponent } from './admin/admin.component';
import { CsvModule } from '../csv/csv.module';

@NgModule({
  imports: [
    CommonModule,
    CsvModule,
    NgxDatatableModule,
    FlexLayoutModule,
    LocalizeRouterModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    AdminRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [HomeComponent, AdminComponent],
  providers: [
    AdminGuard
  ]
})
export class AdminModule {
}
