import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { latLng, Map, tileLayer } from 'leaflet';
import { CityTeached } from '../../../shared/interfaces/city-teached';
import { Media } from '../../../shared/interfaces/media';
import { Mono } from '../../../shared/interfaces/mono';
import { CityTeachedService } from '../../../shared/services/city-teached.service';
import { GoogleApisService } from '../../../shared/services/google-apis.service';
import { LeafletService } from '../../../shared/services/leaflet.service';
import { ProfilService } from '../../../shared/services/profil.service';

@Component({
  selector: 'app-profil-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
  mono: Mono;
  cityTeached: CityTeached;
  citiesTeached: CityTeached[] = [];

  constructor(private googleApisService: GoogleApisService,
              private leafletService: LeafletService,
              private profilService: ProfilService,
              private cityTeachedService: CityTeachedService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getMono();
    this.getCityTeached();
    this.getCitiesTeached();
  }

  getMono() {
    this.profilService.mono
      .subscribe(mono => {
        if (mono) {
          this.mono = mono;
          this.changeDetectorRef.detectChanges();
        }
      });
  }

  getCitiesTeached() {
    this.profilService.citiesTeached
      .subscribe((citiesTeached: CityTeached[]) => {
        this.citiesTeached = this.getImages(citiesTeached);
        this.changeDetectorRef.detectChanges();
      });
  }

  getCityTeached() {
    this.profilService.cityTeached
      .subscribe((cityTeached: CityTeached) => {
        this.cityTeached = cityTeached;
        this.changeDetectorRef.detectChanges();
      });
  }

  onMapReady(map: Map, ct: CityTeached) {
    ct.map.instance = map;
    this.leafletService.getImage(ct.map.instance)
      .subscribe((image) => {
        this.citiesTeached = this.citiesTeached.map((cityTeached) => {
          if (cityTeached.id === ct.id) {
            cityTeached.picture.url = image.src;
            cityTeached.map.display = false;
          }
          return cityTeached;
        });

        this.changeDetectorRef.detectChanges();
      });
  }

  getImages(citiesTeached: CityTeached[]): CityTeached[] {
    return citiesTeached.map((cityTeached: CityTeached) => {
      cityTeached.picture = {} as Media;
      cityTeached.map = {
        display: true,
        options: {
          layers: [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
          ],
          minZoom: 5,
          maxZoom: 5,
          zoom: 5,
          center: latLng(48.853, 2.35)
        }
      };
      if (cityTeached.city.meeting_points &&
        Array.isArray(cityTeached.city.meeting_points) &&
        cityTeached.city.meeting_points.length &&
        cityTeached.city.meeting_points[0].lng &&
        cityTeached.city.meeting_points[0].lat) {
        cityTeached.map.options.center =
          latLng(cityTeached.city.meeting_points[0].lat, cityTeached.city.meeting_points[0].lng);
      }

      return cityTeached;
    });
  }
}
