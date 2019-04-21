import { Inject, Injectable } from '@angular/core';
import { Product } from './product';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { take, timeout } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class ProductService extends VisitorService {
  static getDiscountRate(product: Product): number {
    if (product && product.price && product.promo) {
      return -Math.floor((Math.abs(product.price - product.promo)) /
        ((product.price + product.promo) / 2) * 100);
    }
    return 0;
  }


  constructor(afs: AngularFirestore, @Inject('TABLE_PRODUCT') table: string) {
    super(afs, table);
  }

  updateProductByKey(key: string, body: Product): Observable<Product> {
    return new Observable<Product>(observer => {
      this.getProduct(key)
        .pipe(take(1))
        .subscribe((product) => {
          if (body.ordered) {
            if (product.ordered) {
              product.ordered += body.ordered;
            } else {
              product.ordered = body.ordered;
            }
            if (product.ordered_by_month && product.ordered_by_month[moment().format('YYYY-MM')]) {
              product.ordered_by_month[moment().format('YYYY-MM')] += body.ordered;
            } else {
              product.ordered_by_month = {};
              product.ordered_by_month[moment().format('YYYY-MM')] = body.ordered;
            }
          }

          product = {...product, ...body};

          this.updateProduct(product)
            .pipe(take(1))
            .subscribe(() => {
              observer.next(product);
              observer.complete();
            }, (err) => {
              observer.error(err);
            });
        }, (err) => observer.error(err));
    });
  }

  getProducts(): Observable<Product[]> {
    return super.getDocuments() as Observable<Product[]>;
  }

  getProduct(key: string): Observable<Product> {
    return super.getDocument(key) as Observable<Product>;
  }

  createProduct(product: Product): Observable<any> {
    return from(super.createDocument(product))
      .pipe(
        timeout(5000)
      );
  }

  updateProduct(product: Product): Observable<void> {
    return from(super.updateDocument(product))
      .pipe(
        timeout(5000)
      );
  }

  deleteProduct(product: Product) {
    return super.deleteDocument(product);
  }
}
