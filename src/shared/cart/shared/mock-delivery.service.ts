import { of } from 'rxjs';
import { mockDeliveries, mockDelivery } from './mock-delivery';

export class MockDeliveryService {

  constructor() {
  }

  getDeliveries() {
    return of(mockDeliveries);
  }

  getDelivery() {
    return of(mockDelivery);
  }

  updateDelivery() {
    return of();
  }

  createDelivery() {
    return of(mockDelivery);
  }
}
