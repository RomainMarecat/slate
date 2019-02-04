import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { InputComponent } from './input/input.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectComponent } from './select/select.component';
import { SliderComponent } from './slider/slider.component';
import { FormRoutingModule } from './form-routing.module';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule, MatSelectModule, MatSliderModule,
  MatSlideToggleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxEditorModule } from 'ngx-editor';
import { StorageModule } from '../../media/storage/storage.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatAutocompleteModule,
    StorageModule,
    MatInputModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    AutocompleteComponent,
    CheckboxComponent,
    DatepickerComponent,
    InputComponent,
    RadioButtonComponent,
    SelectComponent,
    SliderComponent,
    SlideToggleComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ]
})
export class FormModule {
}
