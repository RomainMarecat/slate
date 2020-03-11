import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { Login1Component } from './login1/login1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { LoginListComponent } from './login-list/login-list.component';
import { Login2Component } from './login2/login2.component';
import { LoginComponent } from './login/login.component';
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
    LoginRoutingModule,
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
  declarations: [
    Login1Component,
    LoginListComponent,
    Login2Component,
    LoginComponent
  ],
  exports: [
    Login1Component,
    Login2Component,
    LoginListComponent
  ],
})
export class LoginModule {
}
