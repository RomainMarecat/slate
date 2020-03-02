import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private secureUrl = `${environment.middleware}/v1/restricted/orders`;

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.secureUrl);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.secureUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.secureUrl, order);
  }

  updateOrder(order: Order): Observable<void> {
    return this.http.put<void>(`${this.secureUrl}/${order.id}`, order);
  }

  deleteOrder(order: Order) {
    return this.http.delete<void>(`${this.secureUrl}/${order.id}`);
  }
}
