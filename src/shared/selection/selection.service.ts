import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Selection } from 'shared/selection/selection';
import { VisitorService } from '../firestore/visitor.service';

@Injectable()
export class SelectionService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_SELECTION') table: string) {
    super(afs, table);
  }

  getSelections(): Observable<Selection[]> {
    return super.getDocuments() as Observable<Selection[]>;
  }

  getSelection(key: string): Observable<Selection> {
    return super.getDocument(key) as Observable<Selection>;
  }

  createSelection(selection: Selection): Promise<any> {
    return super.createDocument(selection);
  }

  updateSelection(selection: Selection) {
    return super.updateDocument(selection);
  }

  deleteSelection(selection: Selection) {
    return super.deleteDocument(selection);
  }
}
