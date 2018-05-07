import { Component, Input, OnInit } from '@angular/core';
import { Marker } from '../shared/map';

@Component({
  selector: 'app-map-location-current',
  templateUrl: './location-current.component.html',
  styleUrls: [ './location-current.component.scss' ]
})
export class LocationCurrentComponent implements OnInit {

  _mapConfig = {
    lat: 45.97215152618962,
    lng: 2.61474609375,
    zoom: 6,
    disableDefaultUI: false,
    zoomControl: false,
    streetViewControl: true,
    markerDraggable: false
  };

  marker: Marker = null;

  constructor() {
  }

  ngOnInit() {

  }

  /**
   * Position of current pointer
   * @param event
   */
  onMapClick(event: { coords: { lat: number, lng: number } }) {
    this.marker = {
      lat: event.coords.lat,
      lng: event.coords.lng,
      label: 'location-current.label.meeting',
      draggable: false
    };
  }

  @Input() set mapConfig(mapConfig) {
    this._mapConfig = mapConfig;
    this.onMapClick({
      coords: {
        lat: this.mapConfig.lat,
        lng: this.mapConfig.lng
      }
    });
  }

  get mapConfig() {
    return this._mapConfig;
  }
}
