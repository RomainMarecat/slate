import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Action } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query, DocumentSnapshot } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';
import { VisitorService } from '../../firestore/visitor.service';

@Injectable()
export class MapService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_OFFER') table: string) {
    super(afs, table);
  }

  getMaps(): Observable < Map[] > {
    return super.getDocuments() as Observable < Map[] > ;
  }

  getMap(key: string): Observable < Map > {
    return super.getDocument(key) as Observable < Map > ;
  }

  createMap(map: Map): Promise < any > {
    return super.createDocument(map);
  }

  updateMap(map: Map) {
    return super.updateDocument(map);
  }


  deleteMap(map: Map) {
    return super.deleteDocument(map);
  }
}
