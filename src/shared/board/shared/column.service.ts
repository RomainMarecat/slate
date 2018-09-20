import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Column } from './column';
import { VisitorService } from 'shared/firestore/visitor.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ColumnService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_COLUMN') table: string) {
    super(afs, table);
  }

  getColumns(): Observable<Column[]> {
    return super.getDocuments() as Observable<Column[]>;
  }

  getColumn(key: string): Observable<Column> {
    return super.getDocument(key) as Observable<Column>;
  }

  createColumn(column: Column): Promise<any> {
    return super.createDocument(column);
  }

  updateColumn(column: Column) {
    return super.updateDocument(column);
  }

  deleteColumn(column: Column) {
    return super.deleteDocument(column);
  }
}
