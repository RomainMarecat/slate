import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Reference, Action } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';
import DocumentReference = firebase.firestore.DocumentReference;
import { VisitorService } from './../firestore/visitor.service';
import { Attribute } from './attribute';

@Injectable()
export class AttributeService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_ATTRIBUTES') table: string) {
    super(afs, table);
  }

  getAttributes(): Observable < Attribute[] > {
    return super.getDocuments() as Observable < Attribute[] > ;
  }
}
