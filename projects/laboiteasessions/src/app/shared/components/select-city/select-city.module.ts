import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCityComponent } from './select-city.component';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [SelectCityComponent],
  exports: [SelectCityComponent],
  imports: [
    CommonModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class SelectCityModule {
}
