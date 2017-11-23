import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../shared/product/product.service';
import { IProduct } from './../shared/product/i-product';
import { Observable } from 'rxjs/Observable';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MediaService } from './../shared/media/media.service';
import { LoaderService } from './../shared/loader/loader.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  cols: number;
  @Output() updatedproduct: EventEmitter < IProduct > = new EventEmitter < IProduct > ();
  resizedImage = {
    height: 300,
    width: 500
  };

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute,
    private meta: Meta, private translateService: TranslateService, private mediaService: MediaService,
    private loaderService: LoaderService) {
    this.cols = 0;
    this.loaderService.show();
  }

  /**
   * Subscribe on value return by route nav and get unique identified by product key
   */
  ngOnInit() {
    this.activeRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key.substring(0, value.key.indexOf('-'));
        this.productService.getProduct(key)
          .subscribe((products: IProduct[]) => {
            products.forEach((product) => {
              this.product = product;
              this.loaderService.hide();
              /* itemscope itemtype="http://schema.org/Product" */
              // Title + description
              this.translateService.get('product-detail.meta.title', { value: product.name })
                .subscribe((translation: string) => {
                  this.meta.addTag({ name: 'title', content: translation });
                });
              this.translateService.get('product-detail.meta.description', { value: product.name })
                .subscribe((translation: string) => {
                  this.meta.addTag({ name: 'description', content: translation });
                });

              // Open Graph data
              this.translateService.get('product-detail.meta.og:site_name')
                .subscribe((translation: string) => {
                  this.meta.addTag({ name: 'og:site_name', content: translation });
                });
              this.meta.addTag({ name: 'og:title', content: product.name });
              this.meta.addTag({ name: 'og:type', content: 'article' });
              this.meta.addTag({
                name: 'og:url',
                content: `https://monpullmoche.com/product/${this.product.key}-${this.product.name}`
              });
              this.meta.addTag({ name: 'og:description', content: product.name });
              this.meta.addTag({ name: 'product:published', content: product.published_at.toString() });
              this.meta.addTag({ name: 'og:price:amount', content: product.price.toString() });
              this.meta.addTag({ name: 'og:price:currency', content: 'EUR' });

              // Twiter Card
              this.meta.addTag({ name: 'twitter:card', content: 'summary' });
              this.meta.addTag({ name: 'twitter:site', content: '@monpullmoche' });
              this.meta.addTag({ name: 'twitter:title', content: product.name });
              this.meta.addTag({ name: 'twitter:description', content: product.description });
              this.meta.addTag({ name: 'twitter:creator', content: product.creator });
              this.meta.addTag({ name: 'twitter:image', content: this.mediaService.getPictureSrc(product.image1) });

              // Google +
              this.meta.addTag({ itemprop: 'name', content: product.name });
              this.meta.addTag({ itemprop: 'description', content: product.description });
              this.meta.addTag({ itemprop: 'image', content: this.mediaService.getPictureSrc(product.image1) });

            });
            this.countCols();
          });
      }
    });
  }

  /**
   * Dynamic count columns for product image
   */
  countCols() {
    if (this.product) {
      if (this.product.image1) {
        this.cols++;
      }
      if (this.product.image2) {
        this.cols++;
      }
      if (this.product.image3) {
        this.cols++;
      }
    }

  }

  /**
   * Update current score for the product
   * @param {IProduct} product
   */
  updateScoreProduct(product: IProduct) {
    this.updatedproduct.emit(product);
  }

}
