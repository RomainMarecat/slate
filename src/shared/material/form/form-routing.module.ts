import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { InputComponent } from './input/input.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectComponent } from './select/select.component';
import { SliderComponent } from './slider/slider.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';

const routes: Routes = [ {
  path: 'component/autocomplete',
  canActivate: [ AdminGuard ],
  component: AutocompleteComponent
}, {
  path: 'component/checkbox',
  canActivate: [ AdminGuard ],
  component: CheckboxComponent
},
  {
    path: 'component/datepicker',
    canActivate: [ AdminGuard ],
    component: DatepickerComponent
  },
  {
    path: 'component/input',
    canActivate: [ AdminGuard ],
    component: InputComponent
  },
  {
    path: 'component/radio-button',
    canActivate: [ AdminGuard ],
    component: RadioButtonComponent
  },
  {
    path: 'component/select',
    canActivate: [ AdminGuard ],
    component: SelectComponent
  },
  {
    path: 'component/slider',
    canActivate: [ AdminGuard ],
    component: SliderComponent
  }, {
    path: 'component/slide-toggle',
    canActivate: [ AdminGuard ],
    component: SlideToggleComponent
  }, ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class FormRoutingModule {
}