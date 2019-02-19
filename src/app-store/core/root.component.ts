import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../../shared/user/shared/user.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { I18nService } from '../../shared/i18n/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class AppRootComponent implements OnInit {

  menuConfig = {
    displayAdminRecipe: false,
    urlAdmin: ['admin'],
    displayBurgerMenu: false,
    displayButtonConnection: false,
    displayIconButtonConnection: false,
    underlineTitle: false,
    displayCart: true
  };

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
              private router: Router) {
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
  }

  startAnalytics() {
    this.angulartics2GoogleAnalytics.startTracking();
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
