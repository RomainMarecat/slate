import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Event } from '@romainmarecat/ngx-calendar';

@Injectable({
  providedIn: 'root'
})
export class EventService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_EVENT') table: string) {
    super(afs, table);
  }

  getEvents(): Observable<Event[]> {
    return super.getDocuments() as Observable<Event[]>;
  }

  getEvent(key: string): Observable<Event> {
    return super.getDocument(key) as Observable<Event>;
  }

  createEvent(event: Event): Promise<any> {
    return super.createDocument(event);
  }

  updateEvent(event: Event) {
    return super.updateDocument(event);
  }

  deleteEvent(event: Event) {
    return super.deleteDocument(event);
  }
}
