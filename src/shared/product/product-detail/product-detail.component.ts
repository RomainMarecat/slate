import { Component, OnInit, Output, EventEmitter, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MediaService } from '../../media/media.service';
import { LoaderService } from '../../loader/loader.service';
import { CloudinaryTagService } from '../../media/cloudinary/cloudinary-tag.service';
import { environment } from '../../../app-ecommerce/environments/environment';
import { Product } from '../shared/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  cols: number;
  @Output() updatedproduct: EventEmitter<Product> = new EventEmitter<Product>();
  resizedImage = {
    height: 300,
  };
  cloudinary: boolean;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private meta: Meta,
              private translateService: TranslateService,
              private mediaService: MediaService,
              private loaderService: LoaderService,
              @Optional() private cloudinaryTagService: CloudinaryTagService) {
    this.cols = 0;
    this.loaderService.show();
    this.cloudinary = !!this.cloudinaryTagService;
  }

  /**
   * Subscribe on value return by route nav and get unique identified by product key
   */
  ngOnInit() {
    this.activatedRoute.params
      .subscribe((value: {key: string}) => {
        if (value.key) {
          let key = value.key;
          if (value.key.indexOf('-') !== -1) {
            key = value.key.substring(0, value.key.indexOf('-'));
          }

          this.productService.getProduct(key)
            .subscribe((product: Product) => {
              if (product) {
                this.product = product;
                this.loaderService.hide();
                /* itemscope itemtype="http://schema.org/Product" */
                // Title + description
                this.translateService.get('product-detail.meta.title', {value: product.name})
                  .subscribe((translation: string) => {
                    this.meta.addTag({name: 'title', content: translation});
                  });
                this.translateService.get('product-detail.meta.description', {value: product.name})
                  .subscribe((translation: string) => {
                    this.meta.addTag({name: 'description', content: translation});
                  });

                // Open Graph data
                this.translateService.get('product-detail.meta.og:site_name')
                  .subscribe((translation: string) => {
                    this.meta.addTag({name: 'og:site_name', content: translation});
                  });
                this.meta.addTag({name: 'og:title', content: product.name});
                this.meta.addTag({name: 'og:type', content: 'article'});
                this.meta.addTag({
                  name: 'og:url',
                  content: `https://${environment.site_name}/products/product/${this.product.key}-${this.product.name}`
                });
                this.meta.addTag({name: 'og:description', content: product.name});
                if (product.published_at) {
                  this.meta.addTag({name: 'product:published', content: product.published_at.toString()});
                }
                if (product.price) {
                  this.meta.addTag({name: 'og:price:amount', content: product.price.toString()});
                }
                this.meta.addTag({name: 'og:price:currency', content: 'EUR'});

                // Twiter Card
                this.meta.addTag({name: 'twitter:card', content: 'summary'});
                this.meta.addTag({name: 'twitter:site', content: '@clothe'});
                this.meta.addTag({name: 'twitter:title', content: product.name});
                this.meta.addTag({name: 'twitter:description', content: product.description});
                this.meta.addTag({name: 'twitter:creator', content: product.creator});
                if (this.cloudinary) {
                  this.meta.addTag({
                    name: 'twitter:image',
                    content: this.cloudinaryTagService.getPictureSrc(product.image1)
                  });
                }

                // Google +
                this.meta.addTag({itemprop: 'name', content: product.name});
                this.meta.addTag({itemprop: 'description', content: product.description});
                if (this.cloudinary) {
                  this.meta.addTag({
                    itemprop: 'image',
                    content: this.cloudinaryTagService.getPictureSrc(product.image1)
                  });
                }

                this.countCols();
              }
            }, () => {
              this.loaderService.hide();
            });
        } else {
          this.loaderService.hide();
        }
      }, () => {
        this.loaderService.hide();
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
   */
  updateScoreProduct(product: Product) {
    this.updatedproduct.emit(product);
  }

}
