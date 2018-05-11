import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Booking } from './booking';

@Injectable()
export class BookingService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_BOOKING') table: string) {
    super(afs, table);
  }

  getBookings(): Observable<Booking[]> {
    return super.getDocuments() as Observable<Booking[]>;
  }

  getBooking(key: string): Observable<Booking> {
    return super.getDocument(key) as Observable<Booking>;
  }

  createBooking(booking: Booking): Promise<any> {
    return super.createDocument(booking);
  }

  updateBooking(booking: Booking): Promise<void> {
    return super.updateDocument(booking);
  }

  deleteBooking(booking: Booking) {
    return super.deleteDocument(booking);
  }
}
