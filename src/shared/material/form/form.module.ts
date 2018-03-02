import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { InputComponent } from './input/input.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectComponent } from './select/select.component';
import { SliderComponent } from './slider/slider.component';
import { FormRoutingModule } from './form-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormRoutingModule
  ],
  declarations: [CheckboxComponent, DatepickerComponent, InputComponent, RadioButtonComponent, SelectComponent, SliderComponent]
})
export class FormModule { }
