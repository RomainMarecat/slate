import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LanguageSimpleSelectModule } from '../../shared/components/language/language-simple-select/language-simple-select.module';
import { MyAccountComponent } from './my-account.component';
import { MyAccountRoutingModule } from './my-account.routing.module';
import { NationalitySelectModule } from './nationality-select/nationality-select.module';


@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatListModule,
    MatDialogModule,
    MyAccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    NationalitySelectModule,
    LanguageSimpleSelectModule,
  ],
  declarations: [
    MyAccountComponent,
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class MyAccountModule {
}
