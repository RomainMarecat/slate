import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GprdRoutingModule } from './gprd-routing.module';
import { GprdComponent } from './gprd/gprd.component';
import { SharedModule } from '../shared.module';
import { OptinModule } from './optin/optin.module';
import { HelpModule } from './help/help.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OptinModule,
    HelpModule,
    GprdRoutingModule
  ],
  declarations: [
    GprdComponent
  ]
})
export class GprdModule {
}
