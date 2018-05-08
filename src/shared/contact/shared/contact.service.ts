import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Contact } from './contact';

@Injectable()
export class ContactService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_CONTACT') table: string) {
    super(afs, table);
  }

  getContacts(): Observable<Contact[]> {
    return super.getDocuments() as Observable<Contact[]>;
  }

  getContact(key: string): Observable<Contact> {
    return super.getDocument(key) as Observable<Contact>;
  }

  createContact(contact: Contact): Promise<any> {
    return super.createDocument(contact);
  }

  updateContact(contact: Contact) {
    return super.updateDocument(contact);
  }


  deleteContact(contact: Contact) {
    return super.deleteDocument(contact);
  }
}
