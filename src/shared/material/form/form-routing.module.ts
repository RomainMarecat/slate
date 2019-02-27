import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { InputComponent } from './input/input.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectComponent } from './select/select.component';
import { SliderComponent } from './slider/slider.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [
  {
    path: 'component/autocomplete',
    component: AutocompleteComponent
  }, {
    path: 'component/checkbox',
    component: CheckboxComponent
  },
  {
    path: 'component/datepicker',
    component: DatepickerComponent
  },
  {
    path: 'component/input',
    component: InputComponent
  },
  {
    path: 'component/radio-button',
    component: RadioButtonComponent
  },
  {
    path: 'component/select',
    component: SelectComponent
  },
  {
    path: 'component/slider',
    component: SliderComponent
  }, {
    path: 'component/slide-toggle',
    component: SlideToggleComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class FormRoutingModule {
}
