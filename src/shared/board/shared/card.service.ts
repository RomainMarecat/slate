import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Card } from './card';
import { VisitorService } from 'shared/firestore/visitor.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CardService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_CARD') table: string) {
    super(afs, table);
  }

  getCards(): Observable<Card[]> {
    return super.getDocuments() as Observable<Card[]>;
  }

  getCard(key: string): Observable<Card> {
    return super.getDocument(key) as Observable<Card>;
  }

  createCard(card: Card): Promise<any> {
    return super.createDocument(card);
  }

  updateCard(card: Card) {
    return super.updateDocument(card);
  }

  deleteCard(card: Card) {
    return super.deleteDocument(card);
  }
}
