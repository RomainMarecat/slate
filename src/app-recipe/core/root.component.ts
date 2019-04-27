import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { DomSanitizer } from '@angular/platform-browser';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { UserService } from '../../shared/user/shared/user.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { I18nService } from '../../shared/i18n/i18n.service';
import { MatIconRegistry } from '@angular/material';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Recipe } from '../recipe/shared/recipe';
import { RecipeService } from '../recipe/shared/recipe.service';
import { Filter } from '../../shared/facet/filter/shared/filter';
import { MenuConfiguration } from '../../shared/menu/shared/menu-configuration';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class AppRootComponent implements OnInit, OnDestroy {
  menuConfig: MenuConfiguration = {
    displayLogo: false,
    show_page_title: true,
    displaySearchIcon: true,
    customIconConnection: true,
    connectionBtn: {
      mat_color: 'primary'
    },
    displayAdminRecipe: true,
    urlAdmin: ['admin', 'recipe'],
    displayBurgerMenu: false,
    displayButtonConnection: true,
    displayIconButtonConnection: true,
    underlineTitle: true,
    displayCart: false
  };

  recipes: Recipe[];

  /**
   * Root Constructor
   */
  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
              public userService: UserService,
              private loaderService: LoaderService,
              private i18nService: I18nService,
              private ccService: NgcCookieConsentService,
              public matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private router: Router,
              private recipeService: RecipeService) {
    this.matIconRegistry.addSvgIcon(
      `search`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/search.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `user`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/images/user.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-left`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/images/arrow-left.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-right`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/images/arrow-right.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-down`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/images/arrow-down.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-up`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/images/arrow-up.svg`)
    );

    // previous url
    let previousRoute = router.routerState.snapshot.url;

    // Route subscriber
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((data: NavigationEnd) => {
        // We want to reset the scroll position on navigation except when navigating within
        // the page for a single component.
        if (!isNavigationWithinComponentView(previousRoute, data.urlAfterRedirects)) {
          resetScrollPosition();
        }

        previousRoute = data.urlAfterRedirects;
      });
  }

  ngOnInit() {
    this.startAnalytics();
    this.onQuery({limit: 10});
  }

  ngOnDestroy() {
  }

  startAnalytics() {
    this.angulartics2GoogleAnalytics.startTracking();
  }

  onQuery(query: {limit?: number, filters?: Filter[]}) {
    if (query) {
      this.recipeService.query$.next(query);
      this.recipeService.getRecipes()
        .subscribe((recipes) => {
          this.recipes = recipes;
        }, () => {
          this.recipes = [];
        });
    }
  }
}


/**
 * If component is new component with a view
 */
function isNavigationWithinComponentView(oldUrl: string, newUrl: string) {
  const componentViewExpression = /components\/(\w+)/;
  return oldUrl && newUrl
    && componentViewExpression.test(oldUrl)
    && componentViewExpression.test(newUrl)
    && oldUrl.match(componentViewExpression)[1] === newUrl.match(componentViewExpression)[1];
}

/**
 * Reset scroll top 0 if side nav mat content exists
 */
function resetScrollPosition() {
  if (typeof document === 'object' && document) {
    const sidenavContent = document.querySelector('.main-content');
    if (sidenavContent) {
      sidenavContent.scrollTop = 0;
    }
  }
}
