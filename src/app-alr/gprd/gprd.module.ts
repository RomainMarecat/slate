import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GprdRoutingModule } from './gprd-routing.module';
import { GprdComponent } from './gprd/gprd.component';
import { OptinListComponent } from './optin-list/optin-list.component';
import { SharedModule } from 'shared/shared.module';
import { OptinNewsletterComponent } from './optin-newsletter/optin-newsletter.component';
import { OptinManagerComponent } from './optin-manager/optin-manager.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GprdRoutingModule
  ],
  declarations: [GprdComponent, OptinListComponent, OptinNewsletterComponent, OptinManagerComponent]
})
export class GprdModule { }
