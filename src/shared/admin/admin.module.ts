import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminGuard } from '../guard/admin.guard';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule } from 'localize-router';
import { AdminComponent } from './admin/admin.component';
import { CsvModule } from '../csv/csv.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
