import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { LatLngLiteral } from '@agm/core/services/google-maps-types';
import { fromPromise } from 'rxjs/internal-compatibility';

declare var google: any;

@Injectable()
export class GeocodeService {
  private static fields = [
    {type: 'street_address', label: 'street_address'},
    {type: 'route', label: 'route'},
    {type: 'locality', label: 'locality'},
    {type: 'postal_code', label: 'postal_code'},
    {type: 'administrative_area_level_1', label: 'region'},
    {type: 'administrative_area_level_2', label: 'department'},
    {type: 'country', label: 'country'},
  ];
  private geocoder: any;

  private static parseGeocodeResponse(results: any) {
    const parsedResults = {};
    results.forEach((value: any, index: number) => {
      GeocodeService.fields.forEach((field) => {
        if (value.types.indexOf(field.type) !== -1) {
          parsedResults[field.label] = {
            type: field.type,
            place_id: value.place_id,
            address: value.formatted_address,
            lat: value.geometry.location.lat(),
            lng: value.geometry.location.lng()
          };
        }
      });
    });

    return parsedResults;
  }

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
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({address: location}, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              observer.next({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              });
            } else {
              console.error('Error - ', results, ' & Status - ', status);
              observer.next({});
            }
            observer.complete();
          });
        });
      })
    );
  }

  geocodeLatLng(lat: number, lng: number): Observable<any> {
    const location: LatLngLiteral = {lat, lng};
    return this.waitForMapsToLoad().pipe(
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({location}, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              observer.next(GeocodeService.parseGeocodeResponse(results));
            } else {
              console.error('Error - ', results, ' & Status - ', status);
              observer.next({error: results, status});
            }
            observer.complete();
          });
        });
      })
    );
  }
}
