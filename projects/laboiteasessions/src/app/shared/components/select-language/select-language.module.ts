import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SelectLanguageComponent } from './select-language.component';


@NgModule({
  declarations: [SelectLanguageComponent],
  exports: [SelectLanguageComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SelectLanguageModule {
}
