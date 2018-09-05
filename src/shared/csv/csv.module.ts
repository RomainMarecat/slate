import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvExtratorService } from './shared/csv-extrator.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    CsvExtratorService
  ]
})
export class CsvModule {
}
