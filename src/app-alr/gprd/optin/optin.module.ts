import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptinListComponent } from './optin-list/optin-list.component';
import { OptinManagerComponent } from './optin-manager/optin-manager.component';
import { OptinNewsletter2Component } from './optin-newsletter2/optin-newsletter2.component';
import { OptinNewsletterComponent } from './optin-newsletter/optin-newsletter.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    OptinListComponent,
    OptinNewsletterComponent,
    OptinManagerComponent,
    OptinNewsletter2Component
  ],
  exports: [
    OptinListComponent,
    OptinNewsletterComponent,
    OptinManagerComponent,
    OptinNewsletter2Component
  ]
})
export class OptinModule {
}
