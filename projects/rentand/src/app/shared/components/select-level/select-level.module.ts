import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { SelectLevelComponent } from './select-level.component';


@NgModule({
  declarations: [SelectLevelComponent],
  exports: [SelectLevelComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    TranslateModule.forChild()
  ]
})
export class SelectLevelModule {
}
