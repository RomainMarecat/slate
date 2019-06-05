import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { distinctUntilChanged, map, filter, take, tap, timeout } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ProductService } from '../product/shared/product.service';
import { Product } from '../product/shared/product';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category';

interface UriElement {
  url: string;
  label: string;
}

@Component({
  selector: 'app-shared-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  uriElements: UriElement[] = [];

  product: Product;

  category: Category;

  notAllowedUrls: {[key: string]: {breadcrumb: string, function: string}} = {
    'detail/:slug': {breadcrumb: 'breadcrumb.product-detail', function: 'getProduct'},
    ':slug': {breadcrumb: 'breadcrumb.category-detail', function: 'getCategory'}
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService,
              private translateService: TranslateService) {
    this.getUriElements()
      .subscribe((uriElements) => {
        this.uriElements = uriElements;
      });
  }

  /**
   * Les Elements à afficher dans le breadcrumb sous forme d'observable
   */
  getUriElements(): Observable<UriElement[]> {
    return this.router.events
      .pipe(
        tap(() => {
          this.product = null;
          this.category = null;
        }),
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(),
        map(event => [{url: '/', label: 'breadcrumb.home'}, ...this.buildBreadCrumb(this.route.root)]
        ));
  }

  /**
   * Repris et adapté de https://medium.com/@bo.vandersteene/angular-5-breadcrumb-c225fd9df5cf
   */
  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: UriElement[] = [],
    routeIndex = 0
  ): UriElement[] {
    // If no routeConfig is avalailable we are on the root path
    let breadcrumb: UriElement = null;
    const link = route.routeConfig && typeof this.notAllowedUrls[route.routeConfig.path] === 'undefined' ? route.routeConfig.path : '';
    const nextUrl = `${url}${link}/`;

    breadcrumb = this.addLabel(route, breadcrumb, nextUrl);
    const newBreadcrumbs = breadcrumb ? [...breadcrumbs, breadcrumb] : breadcrumbs;
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcrumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs, routeIndex + 1);
    }
    return newBreadcrumbs;
  }

  addLabel(route: ActivatedRoute, breadcrumb: UriElement, nextUrl: string): UriElement {
    if (route && route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb']) {
      const label = route.routeConfig.data['breadcrumb'];
      // In the routeConfig the complete path is not available,
      // so we rebuild it each time
      breadcrumb = {
        label: label,
        url: nextUrl
      };
      if (typeof this.notAllowedUrls[route.routeConfig.path] !== 'undefined') {
        // Ajoute pour la route détail produit un lien en plus concernant le titre du produit
        this.addCustomProduct(route);
      } else {
        this.product = null;
        this.category = null;
      }
    }

    return breadcrumb;
  }

  /**
   * Ajoute un détail produit si on est sur la route du détail de produit
   */
  addCustomProduct(route: ActivatedRoute) {
    if (route &&
      route.routeConfig &&
      route.routeConfig.data &&
      route.routeConfig.data['breadcrumb'] &&
      route.snapshot.params.slug &&
      route.routeConfig.data['breadcrumb'] === this.notAllowedUrls[route.routeConfig.path].breadcrumb) {
      this.product = null;
      this.category = null;
      this[this.notAllowedUrls[route.routeConfig.path].function](route.snapshot.params.slug);
    } else {
      this.product = null;
      this.category = null;
    }
  }

  getCategory(key: string) {
    this.categoryService.getCategory(key)
      .subscribe((category) => {
        this.category = category;
      }, () => {
        this.category = null;
      });
  }

  /**
   * On souscrit au produit en cherchant son id
   */
  getProduct(id: string) {
    this.productService.getProduct(id)
      .pipe(
        take(1),
        timeout(5000)
      )
      .subscribe((product: Product) => {
        this.product = product;
        if (product && product.category) {
          this.getCategory(product.category);
        }
      }, () => {
        this.product = null;
      });
  }
}
