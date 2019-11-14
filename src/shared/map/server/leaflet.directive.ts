import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  // tslint:disable
  selector: '[leaflet]'
  // tslint:enable
})
export class LeafletDirective {

  @Input() leafletLayers = [];
  @Input() leafletOptions = {};

  @Output() leafletMapReady: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }
}
