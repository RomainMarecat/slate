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

@NgModule({
  imports: [
    CommonModule,
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
  declarations: [HomeComponent],
  providers: [
    AdminGuard
  ]
})
export class AdminModule {
}
