import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Marker } from '../interfaces/marker.type';

@Injectable({
  providedIn: 'root'
})
export class GoogleApisService {

  constructor(private http: HttpClient) {
  }

  getPlacePicUrl(placeId: string): Observable<string> {
    const apiKey = environment.googlePlaceApiKey;
    const placeDetailUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='
      + placeId + '&key=' + apiKey;
    const placePhotoMaxWidth = '600';
    const placePhotoMinWidth = '1000';
    const placePhotoBaseUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth='
      + placePhotoMaxWidth + '&minwidth=' + placePhotoMinWidth + '&key=' + apiKey;
    const placePhotoFullUrl = '';
    const photoRef = '';
    return of('');
  }

  getPlaceMapPicUrl(lat: number, lng: number, markers: Marker[]): string {
    const apiKey = environment.googlePlaceApiKey;
    const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    const centerParameter = '?center=' + lat + ',' + lng;
    const zoomParameter = '&zoom=10';
    const sizeParameter = '&size=640x300';
    const keyParameter = '&key=' + apiKey;

    let markersStr = '';
    markers.forEach(marker => {
      markersStr += '&markers=' + marker.lat + ',' + marker.lng;
    });

    return baseUrl + centerParameter + zoomParameter + sizeParameter + markersStr + keyParameter;
  }
}
