import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { icon, latLng, LatLngExpression, Map as LeafletMap, MapOptions, Marker as LeafletMarker, marker, tileLayer } from 'leaflet';
import { Marker } from '../shared/map';
import { MapService } from '../shared/map.service';

@Component({
  selector: 'app-map-location-current',
  templateUrl: './location-current.component.html',
  styleUrls: ['./location-current.component.scss']
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

  options: MapOptions;

  markers: LeafletMarker[] = [];

  marker: Marker = null;

  @Input() type: 'google' | 'leaflet';

  constructor(private mapService: MapService,
              private translateService: TranslateService) {
    this.type = 'google';
  }

  ngOnInit() {
  }


  onMapReady(readyMap: LeafletMap) {
    this.mapService.onMapReady(readyMap);
  }

  /**
   * Position of current pointer
   */
  onMapClick(event: {coords: {lat: number, lng: number}}) {
    this.marker = {
      lat: event.coords.lat,
      lng: event.coords.lng,
      label: 'location-current.label.meeting',
      draggable: false
    };
  }

  @Input() set mapConfig(mapConfig) {
    if (mapConfig) {
      this._mapConfig = mapConfig;
      this.onMapClick({
        coords: {
          lat: this.mapConfig.lat,
          lng: this.mapConfig.lng
        }
      });
      this.options = {
        layers: [
          tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18,
              attribution: '...'
            }
          )
        ],
        minZoom: 10,
        maxZoom: 18,
        zoom: 12,
        center: latLng(mapConfig.lat, mapConfig.lng)
      };

      this.addMarker(latLng(mapConfig.lat, mapConfig.lng));
    }
  }

  get mapConfig() {
    return this._mapConfig;
  }

  addMarker(latLngLocation: LatLngExpression) {
    const iconMarker: LeafletMarker = marker(
      latLngLocation,
      {
        icon: icon({
          iconUrl: 'assets/map/marker-icon.png',
          shadowUrl: 'assets/map/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          popupAnchor: [0, -41]
        })
      }
    )
      .bindPopup(this.translateService.instant('location-current.label.meeting'));
    this.markers.push(iconMarker);
  }
}
