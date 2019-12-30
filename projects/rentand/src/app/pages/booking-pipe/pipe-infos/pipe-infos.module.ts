import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageSimpleSelectModule } from '../../../shared/components/select-language/language-simple-select.module';
import { SelectAgeModule } from '../../../shared/components/select-age/select-age.module';
import { SelectLevelModule } from '../../../shared/components/select-level/select-level.module';
import { PipeInfosComponent } from './pipe-infos.component';

@NgModule({
  declarations: [
    PipeInfosComponent
  ],
  exports: [
    PipeInfosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LanguageSimpleSelectModule,
    SelectLevelModule,
    SelectAgeModule
  ]
})
export class PipeInfosModule {
}
