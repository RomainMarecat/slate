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
  MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRadioModule,
  MatSlideToggleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormRoutingModule
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
  ]
})
export class FormModule {
}
