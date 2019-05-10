import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { timeout } from 'rxjs/operators';
import { VisitorService } from '../../firestore/visitor.service';
import { Contact } from './contact';

@Injectable()
export class ContactService extends VisitorService {

  contactSelected: BehaviorSubject<Contact> = new BehaviorSubject<Contact>(null);

  constructor(afs: AngularFirestore, @Inject('TABLE_CONTACT') table: string) {
    super(afs, table);
  }

  getContacts(): Observable<Contact[]> {
    return super.getDocuments() as Observable<Contact[]>;
  }

  getContact(key: string): Observable<Contact> {
    return super.getDocument(key) as Observable<Contact>;
  }

  createContact(contact: Contact): Observable<any> {
    return from(super.createDocument(contact))
      .pipe(
        timeout(5000)
      );
  }

  updateContact(contact: Contact): Observable<void> {
    return from(super.updateDocument(contact))
      .pipe(
        timeout(5000)
      );
  }

  deleteContact(contact: Contact) {
    return super.deleteDocument(contact);
  }
}
