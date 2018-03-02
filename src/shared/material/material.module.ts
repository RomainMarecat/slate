import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/button.module';
import { DatatableModule } from './datatable/datatable.module';
import { FormModule } from './form/form.module';
import { LayoutModule } from './layout/layout.module';
import { NavigationModule } from './navigation/navigation.module';
import { PopupModule } from './popup/popup.module';
import { SummaryComponent } from './summary/summary.component';
import { MaterialRoutingModule } from './material-routing.module';
import { MatCardModule, MatIconModule } from '@angular/material';
import { NgxCarouselModule } from 'ngx-carousel';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DatatableModule,
    FormModule,
    LayoutModule,
    NavigationModule,
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
    NavigationModule,
    PopupModule,
    SummaryComponent
  ]
})
export class MaterialModule {
}
