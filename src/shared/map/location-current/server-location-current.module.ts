import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServerLocationCurrentComponent } from './server-location-current.component';

@NgModule({
  declarations: [
    ServerLocationCurrentComponent,
  ],
  exports: [
    ServerLocationCurrentComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ServerLocationCurrentModule {
}
