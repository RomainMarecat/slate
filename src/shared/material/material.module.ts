import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/button.module';
import { DatatableModule } from './datatable/datatable.module';
import { FormModule } from './form/form.module';
import { LayoutModule } from './layout/layout.module';
import { NavModule } from './navigation/nav.module';
import { PopupModule } from './popup/popup.module';
import { SummaryComponent } from './summary/summary.component';
import { MaterialRoutingModule } from './material-routing.module';
import { MatCardModule, MatIconModule } from '@angular/material';
import { NgxCarouselModule } from 'ngx-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DatatableModule,
    FlexLayoutModule,
    FormModule,
    LayoutModule,
    NavModule,
    PopupModule,
    MaterialRoutingModule,
    MatCardModule,
    MatIconModule,
    NgxCarouselModule
  ],
  declarations: [ SummaryComponent ],
  exports: [
    CommonModule,
    ButtonModule,
    DatatableModule,
    FormModule,
    LayoutModule,
    NavModule,
    PopupModule,
    SummaryComponent
  ]
})
export class MaterialModule {
}
