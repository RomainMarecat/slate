import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSportComponent } from './select-sport.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [SelectSportComponent],
    exports: [SelectSportComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule
    ]
})
export class SelectSportModule {
}
