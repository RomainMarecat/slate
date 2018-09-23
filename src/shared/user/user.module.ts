import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginModule } from 'shared/user/login/login.module';
import { UserListComponent } from './user-list/user-list.component';
import { MatCardModule, MatIconModule, MatListModule, MatTooltipModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterModule } from 'shared/user/register/register.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    LoginModule,
    RegisterModule,
    UserRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    UserListComponent
  ],
  exports: [
    UserListComponent,
    LoginModule,
    RegisterModule,
  ],
})
export class UserModule {
}
