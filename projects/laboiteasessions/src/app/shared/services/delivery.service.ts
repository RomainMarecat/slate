import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Delivery } from '../interfaces/delivery';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FilterQuery } from './query.service';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  filters$: BehaviorSubject<FilterQuery[]> = new BehaviorSubject<FilterQuery[]>([]);

  private secureUrl = `${environment.middleware}/v1/restricted/deliveries`;

  constructor(private http: HttpClient) {
  }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.secureUrl);
  }

  getDeliveryFromCart(cart: Cart): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.secureUrl}/cart/${cart.id}`);
  }

  getDelivery(id: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.secureUrl}/${id}`);
  }

  createDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.secureUrl, delivery);
  }

  updateDelivery(delivery: Delivery): Observable<void> {
    return this.http.put<void>(`${this.secureUrl}/${delivery.id}`, delivery);
  }

  deleteDelivery(delivery: Delivery) {
    return this.http.delete<void>(`${this.secureUrl}/${delivery.id}`);
  }
}
