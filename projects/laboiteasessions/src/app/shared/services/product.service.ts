import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private publicUrl = `${environment.middleware}/v1/public/products`;


  static getDiscountRate(product: Product): number {
    if (product && product.price && product.promo) {
      return -Math.floor((Math.abs(product.price - product.promo)) /
        ((product.price + product.promo) / 2) * 100);
    }
    return 0;
  }

  constructor(private http: HttpClient) {
  }

  updateProductByKey(key: string, body: Product): Observable<Product> {
    return new Observable<Product>(observer => {
      this.getProduct(key)
        .pipe(take(1))
        .subscribe((product) => {

          product = this.applyOrder(product, body);
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

  applyOrder(product: Product, body: Product): Product {
    if (body.ordered) {
      if (product.ordered) {
        product.ordered += body.ordered;
      } else {
        product.ordered = body.ordered;
      }
    }

    return product;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.publicUrl}`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.publicUrl}/${id}`);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post<Product>(`${this.publicUrl}`, product);
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${this.publicUrl}/${product.id}`, product);
  }

  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(`${this.publicUrl}/${product.id}`);
  }
}
