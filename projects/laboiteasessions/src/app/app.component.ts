import { Component, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/store/app.state';
import { LoginCheck } from './shared/store/user/actions/login.action';
import * as moment_ from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

const moment = moment_;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  lang: string = this.translateService.getBrowserLang();
  displayLogoMenu = false;

  constructor(private store: Store<AppState>,
              private elementRef: ElementRef,
              private router: Router,
              private translateService: TranslateService) {
    this.setupApplication();
  }

  setupApplication() {
    this.store.dispatch(new LoginCheck());
    moment.locale(this.lang);
    this.resetPageView();
  }

  /** Callback du click sur le bouton de scroll en haut de page */
  scrollToTop(confirmation: boolean, type: 'auto' | 'smooth' = 'smooth'): void {
    if (confirmation) {
      this.elementRef.nativeElement.scrollIntoView({
        behavior: type,
        block: 'start',
        inline: 'start'
      });
    }
  }

  resetPageView(): void {
    // previous url
    let previousRoute = this.router.routerState.snapshot.url;
    // Route subscriber
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((data: NavigationEnd) => {
        // We want to reset the scroll position on navigation except when navigating within
        // the page for a single component.
        if (!isNavigationWithinComponentView(previousRoute, data.urlAfterRedirects)) {
          this.scrollToTop(true, 'auto');
        }
        previousRoute = data.urlAfterRedirects;
      });
  }


  onPageScrolled(scrolledBottom: boolean) {
    this.displayLogoMenu = !!scrolledBottom;
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
