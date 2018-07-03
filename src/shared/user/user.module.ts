import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginModule } from 'shared/user/login/login.module';
import { UserListComponent } from './user-list/user-list.component';
import { MatCardModule, MatListModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    LoginModule,
    UserRoutingModule,
    TranslateModule,
  ],
  declarations: [UserListComponent],
  exports: [
    UserListComponent,
    LoginModule
  ],
})
export class UserModule {
}
