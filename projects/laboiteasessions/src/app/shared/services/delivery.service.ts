import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../interfaces/delivery';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private secureUrl = `${environment.middleware}/v1/secure/deliveries`;

  constructor(private http: HttpClient) {
  }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.secureUrl);
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
