import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckForUpdateService } from './shared/check-for-update.service';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  imports: [
    CommonModule,
    ServiceWorkerModule
  ],
  providers: [
    CheckForUpdateService
  ]
})
export class PwaModule {
}
