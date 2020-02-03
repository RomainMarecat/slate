import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { SelectAgeComponent } from './select-age.component';


@NgModule({
  declarations: [SelectAgeComponent],
  exports: [SelectAgeComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    TranslateModule.forChild()
  ]
})
export class SelectAgeModule {
}
