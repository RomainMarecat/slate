import { Component, EventEmitter, OnInit, Optional, Output } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseError } from 'firebase';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../app-store/environments/environment';
import { LoaderService } from '../../loader/loader.service';
import { CloudinaryTagService } from '../../media/cloudinary/cloudinary-tag.service';
import { MediaService } from '../../media/media.service';
import { AlertService } from '../../popup/alert.service';
import { SeoService } from '../../seo/shared/seo.service';
import { Product } from '../shared/product';
import { ProductService } from '../shared/product.service';

export interface Section {
  title: string;
  specifications?: string[];
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  sections: Section[] = [
    {
      title: 'overview',
    },
    {
      title: 'description',
    },
    {
      title: 'review',
    }
  ];

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
              private alertService: AlertService,
              private seoService: SeoService,
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
      .subscribe((value: {slug: string}) => {
        if (value.slug) {
          let slug = value.slug;
          if (value.slug.indexOf('-') !== -1) {
            slug = value.slug.substring(0, value.slug.indexOf('-'));
          }
          this.getProduct(slug);
          return;
        }
        this.loaderService.hide();
      }, () => {
        this.loaderService.hide();
      });
  }

  getProduct(slug: string) {
    const subscription: Subscription = this.productService.getProduct(slug)
      .subscribe((product: Product) => {
        if (subscription) {
          subscription.unsubscribe();
        }
        if (product) {
          this.product = product;
          this.updateProduct(product);
          this.loaderService.hide();
          this.seoService.setSeo('product-detail', {name: product.name, description: product.description});
          this.addOpenGraphData(product);
          this.addTwitterData(product);
          this.addGoogleData(product);

          this.countCols();
        }
      }, () => {
        this.loaderService.hide();
      });
  }

  addOpenGraphData(product: Product) {
    // Open Graph data
    this.seoService.addTag('og:site_name', 'meta.og:site_name.product-detail');
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
  }

  addTwitterData(product: Product) {
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
  }

  addGoogleData(product: Product) {
    // Google +
    this.seoService.addTag(
      'name',
      product.name,
      'itemprop'
    );
    this.seoService.addTag(
      'description',
      product.description,
      'itemprop'
    );
    if (this.cloudinary) {
      this.seoService.addTag(
        'image',
        this.cloudinaryTagService.getPictureSrc(product.image1),
        'itemprop'
      );
    }
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

  updateProduct(product: Product) {
    if (product.viewed) {
      product.viewed += 1;
    } else {
      product.viewed = 1;
    }
    this.productService.updateProduct(product)
      .pipe(take(1))
      .subscribe(() => {
        },
        (err: FirebaseError) => {
          this.alertService.openAlertMessage(
            {title: 'error.api.general', message: err.message},
            {panelClass: 'alert-warning'}
          );
        });
  }

  /**
   * Update current score for the product
   */
  updateScoreProduct(product: Product) {
    this.updatedproduct.emit(product);
  }

}
