import { Injectable } from '@angular/core';
import { MapsAPILoader, LatLng } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { LatLngLiteral } from '@agm/core/services/google-maps-types';

declare var google: any;

@Injectable()
export class GeocodeService {
  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) {
  }

  private initGeocoder() {
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return fromPromise(this.mapLoader.load())
        .pipe(
          tap(() => this.initGeocoder()),
          map(() => true)
        );
    }
    return of(true);
  }

  geocodeAddress(location: string): Observable<any> {
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({'address': location}, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              observer.next({
                lat: results[ 0 ].geometry.location.lat(),
                lng: results[ 0 ].geometry.location.lng()
              });
            } else {
              console.log('Error - ', results, ' & Status - ', status);
              observer.next({});
            }
            observer.complete();
          });
        });
      })
    );
  }

  geocodeLatLng(lat: number, lng: number): Observable<any> {
    const location: LatLngLiteral = {lat: lat, lng: lng};
    return this.waitForMapsToLoad().pipe(
      switchMap(() => {
        console.log('lat', lat, 'lng', lng);
        return new Observable(observer => {
          this.geocoder.geocode({'location': location}, (results, status) => {
            console.log(results);
            if (status === google.maps.GeocoderStatus.OK) {
              console.log(results[ 0 ].geometry);
              observer.next({
                location: results[ 0 ].geometry,
              });
            } else {
              console.log('Error - ', results, ' & Status - ', status);
              observer.next({});
            }
            observer.complete();
          });
        });
      })
    );
  }
}
