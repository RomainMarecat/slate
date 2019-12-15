import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { LanguageSimpleSelectComponent } from './language-simple-select.component';


@NgModule({
  declarations: [LanguageSimpleSelectComponent],
  exports: [LanguageSimpleSelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule
  ]
})
export class LanguageSimpleSelectModule {
}
