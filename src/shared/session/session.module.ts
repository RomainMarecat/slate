import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { SessionService } from './shared/session.service';

@NgModule({
  imports: [
    CommonModule,
    SessionRoutingModule
  ],
  declarations: [],
  providers: [
    SessionService
  ]
})
export class SessionModule { }
