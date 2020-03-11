import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { OverviewComponent } from './overview/overview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AccountComponent,
    OverviewComponent
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    MatButtonModule,
    MatListModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ]
})
export class AccountModule {
}
