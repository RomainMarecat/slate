import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { MatCardModule, MatIconModule, MatListModule, MatTooltipModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    UserRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    UserComponent,
    UserListComponent
  ],
  exports: [
    UserComponent,
    UserListComponent,
  ],
})
export class UserModule {
}
