import { Inject, Injectable, Optional } from '@angular/core';
import { Area } from './area';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { VisitorService } from '../../firestore/visitor.service';

@Injectable()
export class AreaService extends VisitorService {
  constructor(afs: AngularFirestore, @Inject('TABLE_AREA') table: string) {
    super(afs, table);
  }

  getAreas(): Observable<Area[]> {
    return super.getDocuments() as Observable<Area[]>;
  }

  getArea(key: string): Observable<Area> {
    return super.getDocument(key) as Observable<Area>;
  }

  createArea(area: Area): Promise<any> {
    return super.createDocument(area);
  }

  updateArea(area: Area) {
    return super.updateDocument(area);
  }


  deleteArea(area: Area) {
    return super.deleteDocument(area);
  }
}
