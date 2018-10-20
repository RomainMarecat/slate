import { Inject, Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';

@Injectable()
export class ProductService extends VisitorService {
  constructor(afs: AngularFirestore, @Inject('TABLE_PRODUCT') table: string) {
    super(afs, table);
  }

  getProducts(): Observable<Product[]> {
    return super.getDocuments() as Observable<Product[]>;
  }

  getProduct(key: string): Observable<Product> {
    return super.getDocument(key) as Observable<Product>;
  }

  createProduct(product: Product): Promise<any> {
    return super.createDocument(product);
  }

  updateProduct(product: Product) {
    return super.updateDocument(product);
  }

  deleteProduct(product: Product) {
    return super.deleteDocument(product);
  }
}
