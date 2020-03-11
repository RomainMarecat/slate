import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterListComponent } from './register-list/register-list.component';
import { Register1Component } from './register1/register1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    RegisterRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [RegisterListComponent, Register1Component, RegisterComponent],
  exports: [RegisterListComponent, Register1Component],
})
export class RegisterModule {
}
