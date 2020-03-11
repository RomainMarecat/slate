import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectLanguageModule } from '../../shared/components/select-language/select-language.module';
import { SelectNationalityModule } from '../../shared/components/select-nationality/select-nationality.module';
import { MyAccountComponent } from './my-account.component';
import { MyAccountRoutingModule } from './my-account.routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  imports: [
    MatSnackBarModule,
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
    SelectNationalityModule,
    SelectLanguageModule,
    MatButtonModule,
    MatCardModule,
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
