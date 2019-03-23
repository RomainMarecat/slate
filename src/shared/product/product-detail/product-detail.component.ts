import { Component, OnInit, Output, EventEmitter, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MediaService } from '../../media/media.service';
import { LoaderService } from '../../loader/loader.service';
import { CloudinaryTagService } from '../../media/cloudinary/cloudinary-tag.service';
import { environment } from '../../../app-store/environments/environment';
import { Product } from '../shared/product';
import { SeoService } from '../../seo/shared/seo.service';
import { Subscription } from 'rxjs';

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
      specifications: [
        `Écran Super Retina (OLED) de 6,5 pouces avec HDR`,
        `Indice IP68 de résistance à la poussière et à l’eau (profondeur maximale de 2 mètres pendant 30 minutes maximum)`,
        `Double appareil photo 12 Mpx avec double OIS (stabilisation optique de l’image) et caméra avant TrueDepth 7 Mpx,
         avec mode Portrait, Éclairage de portrait, Contrôle de la profondeur et HDR intelligent`,
        `Face ID pour l’authentification sécurisée et Apple Pay`,
        `Puce A12 Bionic avec Neural Engine de nouvelle génération`,
        `Recharge sans fil (avec chargeurs Qi)`
      ]
    },
    {
      title: 'description',
    },
    {
      title: 'review',
    },
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
      .subscribe((value: {key: string}) => {
        if (value.key) {
          let key = value.key;
          if (value.key.indexOf('-') !== -1) {
            key = value.key.substring(0, value.key.indexOf('-'));
          }

          const subscription: Subscription = this.productService.getProduct(key)
            .subscribe((product: Product) => {
              if (subscription) {
                subscription.unsubscribe();
              }
              if (product) {
                this.product = product;
                this.updateProduct(product);
                this.loaderService.hide();
                this.seoService.setSeo('product-detail', {name: product.name, description: product.description});
                /* itemscope itemtype="http://schema.org/Product" */
                // Open Graph data
                this.translateService.get('meta.og:site_name.product-detail')
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

  updateProduct(product: Product) {
    if (product.viewed) {
      product.viewed += 1;
    } else {
      product.viewed = 1;
    }
    this.productService.updateProduct(product).subscribe();
  }

  /**
   * Update current score for the product
   */
  updateScoreProduct(product: Product) {
    this.updatedproduct.emit(product);
  }

}
