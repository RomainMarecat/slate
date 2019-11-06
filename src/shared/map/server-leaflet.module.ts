import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletDirective } from './server/leaflet.directive';

@NgModule({
  declarations: [LeafletDirective],
  exports: [LeafletDirective],
  imports: [
    CommonModule
  ]
})
export class ServerLeafletModule {
}
