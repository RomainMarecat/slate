import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GprdRoutingModule } from './gprd-routing.module';
import { GprdComponent } from './gprd/gprd.component';
import { OptinListComponent } from './optin/optin-list/optin-list.component';
import { SharedModule } from 'shared/shared.module';
import { OptinNewsletterComponent } from './optin/optin-newsletter/optin-newsletter.component';
import { OptinManagerComponent } from './optin/optin-manager/optin-manager.component';
import { OptinNewsletter2Component } from './optin/optin-newsletter2/optin-newsletter2.component';
import { OptinModule } from './optin/optin.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OptinModule,
    GprdRoutingModule
  ],
  declarations: [
    GprdComponent
  ]
})
export class GprdModule {
}
