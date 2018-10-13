import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { distinctUntilChanged, map, filter, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ProductService } from '../product/shared/product.service';
import { Product } from '../product/shared/product';

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

  /**
   * @type {Observable<any[]>}
   */
  uriElements: Observable<UriElement[]> = of([]);

  product: Product;

  notAllowedUrls: string[] = [
    'products/:slug'
  ];

  /**
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {ProductService} productService
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService
  ) {
    this.uriElements = this.getUriElements();
  }

  /**
   * Les Elements à afficher dans le breadcrumb sous forme d'observable
   * @param {string} message
   * @returns {Observable<UriElement[]>}
   */
  getUriElements(): Observable<UriElement[]> {
    return this.router.events
      .pipe(
        tap(this.product = null),
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(),
        map(event => [{url: '', label: 'breadcrumb.home'}, ...this.buildBreadCrumb(this.route.root)]
        ));
  }

  /**
   * Repris et adapté de https://medium.com/@bo.vandersteene/angular-5-breadcrumb-c225fd9df5cf
   * @param {ActivatedRoute} route
   * @param {string} url
   * @param {UriElement[]} breadcrumbs
   * @param {number} routeIndex
   * @returns {UriElement[]}
   */
  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: UriElement[] = [],
    routeIndex = 0
  ): UriElement[] {
    // If no routeConfig is avalailable we are on the root path
    let breadcrumb: UriElement = null;
    const link = route.routeConfig && !this.notAllowedUrls.includes(route.routeConfig.path) ? route.routeConfig.path : '';
    const nextUrl = `${url}${link}/`;

    if (route && route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb']) {
      const label = route.routeConfig.data['breadcrumb'];
      // In the routeConfig the complete path is not available,
      // so we rebuild it each time
      breadcrumb = {
        label: label,
        url: nextUrl
      };

      if (this.notAllowedUrls.includes(route.routeConfig.path)) {
        // Ajoute pour la route détail produit un lien en plus concernant le titre du produit
        this.addCustomProduct(route);
      } else {
        this.product = null;
      }
    }

    const newBreadcrumbs = breadcrumb ? [...breadcrumbs, breadcrumb] : breadcrumbs;
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcrumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs, routeIndex + 1);
    }
    return newBreadcrumbs;
  }

  /**
   * Ajoute un détail produit si on est sur la route du détail de produit
   * @param {ActivatedRoute} route
   */
  addCustomProduct(route: ActivatedRoute) {
    if (route &&
      route.routeConfig &&
      route.routeConfig.data &&
      route.routeConfig.data['breadcrumb'] &&
      route.snapshot.params.slug &&
      route.routeConfig.data['breadcrumb'] === 'breadcrumb.product.detail') {
      this.getProduct(route.snapshot.params.slug);
    } else {
      this.product = null;
    }
  }

  /**
   * On souscrit au produit en cherchant son id
   * @param {string} id
   */
  getProduct(id: string) {
    this.productService.getProduct(id)
      .pipe(
        take(1)
      )
      .subscribe((res) => {
        this.product = res;
      }, () => {
        this.product = null;
      });
  }

  /**
   * @issue
   * Doesnt work
   * @returns {boolean}
   */
  isHome(): boolean {
    return this.router.routerState.snapshot.url === '/';
  }
}
