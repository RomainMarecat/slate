import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { VisitorService } from '../firestore/visitor.service';
import { Attribute } from './attribute';

@Injectable()
export class AttributeService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_ATTRIBUTE') table: string) {
    super(afs, table);
  }

  getAttributes(): Observable<Attribute[]> {
    return super.getDocuments() as Observable<Attribute[]>;
  }

  getAttribute(key: string): Observable<Attribute> {
    return super.getDocument(key) as Observable<Attribute>;
  }

  createAttribute(attribute: Attribute): Promise<any> {
    return super.createDocument(attribute);
  }

  updateAttribute(attribute: Attribute) {
    return super.updateDocument(attribute);
  }


  deleteAttribute(attribute: Attribute) {
    return super.deleteDocument(attribute);
  }
}
