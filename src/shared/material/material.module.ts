import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/button.module';
import { DatatableModule } from './datatable/datatable.module';
import { FormModule } from './form/form.module';
import { LayoutModule } from './layout/layout.module';
import { NavigationModule } from './navigation/navigation.module';
import { PopupModule } from './popup/popup.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DatatableModule,
    FormModule,
    LayoutModule,
    NavigationModule,
    PopupModule
  ],
  declarations: []
})
export class MaterialModule { }
