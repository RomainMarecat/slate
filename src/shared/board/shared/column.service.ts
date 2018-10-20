import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Column } from './column';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';

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
