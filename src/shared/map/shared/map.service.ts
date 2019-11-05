import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Map as LeafletMap } from 'leaflet';
import { BehaviorSubject, Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { VisitorService } from '../../firestore/visitor.service';
import { UniversalService } from '../../universal/universal.service';
import { Map } from './map';

@Injectable({
  providedIn: 'root'
})
export class MapService extends VisitorService {

  map$: BehaviorSubject<LeafletMap> = new BehaviorSubject<LeafletMap>(null);

  constructor(afs: AngularFirestore,
              @Inject('TABLE_MAP') table: string,
              private universalService: UniversalService) {
    super(afs, table);
  }

  onMapReady(map: LeafletMap) {
    if (this.universalService.isBrowser()) {
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
