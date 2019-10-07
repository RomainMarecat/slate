import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { VisitorService } from '../../firestore/visitor.service';
import { Map } from './map';
import { Map as LeafletMap } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService extends VisitorService {

  map$: BehaviorSubject<LeafletMap> = new BehaviorSubject<LeafletMap>(null);

  constructor(afs: AngularFirestore,
              @Inject('TABLE_MAP') table: string,
              @Inject(PLATFORM_ID) private platformId) {
    super(afs, table);
  }

  onMapReady(map: LeafletMap) {
    if (isPlatformBrowser(this.platformId)) {
      this.map$.next(map);
    }
  }

  getLeafletMap(): Observable<LeafletMap> {
    return this.map$.asObservable()
      .pipe(
        skipWhile((map) => !map)
      );
  }

  getMaps(): Observable<Map[]> {
    return super.getDocuments() as Observable<Map[]>;
  }

  getMap(key: string): Observable<Map> {
    return super.getDocument(key) as Observable<Map>;
  }

  createMap(item: Map): Promise<any> {
    return super.createDocument(item);
  }

  updateMap(item: Map) {
    return super.updateDocument(item);
  }

  deleteMap(item: Map) {
    return super.deleteDocument(item);
  }
}
