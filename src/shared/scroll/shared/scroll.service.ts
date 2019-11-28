import { DOCUMENT, PlatformLocation } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export const topMargin = 16;

/**
 * A service that scrolls document elements into view
 */
@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  scrollEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  scrollEmitted$: Observable<boolean> = this.scrollEvent.asObservable();
  // tslint:disable
  private _topOffset: number | null;
  private _topOfPageElement: HTMLElement;
  // tslint:enable

  // Offset from the top of the document to bottom of any static elements
  // at the top (e.g. toolbar) + some margin
  get topOffset() {
    if (!this._topOffset) {
      const toolbar = this.document.querySelector('.main-menu');
      this._topOffset = (toolbar && toolbar.clientHeight || 0) + topMargin;
    }
    return this._topOffset;
  }

  get topOfPageElement(): HTMLElement {
    if (!this._topOfPageElement) {
      this._topOfPageElement = this.document.body.querySelector('.main-content');
    }
    return this._topOfPageElement;
  }

  constructor(@Inject(DOCUMENT) private document: any,
              private router: Router,
              private location: PlatformLocation) {
    // On resize, the toolbar might change height, so "invalidate" the top offset.
    fromEvent(window, 'resize').subscribe(() => this._topOffset = null);
  }

  /**
   * Emit new scroll Event to parent
   */
  onScrollTop(value: boolean) {
    if (value) {
      this.scrollEvent.next(value);
    }
  }

  scrollTo(element: string | HTMLElement, duration: number = 500, offset: number = 0): Observable<any> {
    const subject: Subject<any> = new Subject<any>();
    if (typeof element === 'string') {
      const el = this.document.querySelector(element as string);
      this.scrollToElementWithAnimation(el as HTMLElement, duration, offset, subject);
    } else if (element instanceof HTMLElement) {
      this.scrollToElementWithAnimation(element, duration, offset, subject);
    } else {
      subject.error('I don\'t find element');
    }

    return subject;
  }

  /**
   * Scroll to the element with id extracted from the current location hash fragment.
   * Scroll to top if no hash.
   * Don't scroll if hash not found.
   */
  scroll() {
    const hash = this.getCurrentHash();
    const element: Element = hash
      ? this.document.getElementById(hash)
      : this.topOfPageElement;
    this.scrollToElement(element);
  }

  /**
   * Scroll to the element.
   * Don't scroll if no element.
   */
  scrollToElement(element: Element | null) {
    if (element) {

      element.scrollIntoView();

      if (window && window.scrollBy) {
        // Scroll as much as necessary to align the top of `element` at `topOffset`.
        // (Usually, `.top` will be 0, except for cases where the element cannot be scrolled all the
        //  way to the top, because the viewport is larger than the height of the content after the
        //  element.)
        window.scrollBy(0, element.getBoundingClientRect().top - this.topOffset);

        // If we are very close to the top (<20px), then scroll all the way up.
        // (This can happen if `element` is at the top of the page, but has a small top-margin.)
        if (window.pageYOffset < 20) {
          window.scrollBy(0, -window.pageYOffset);
        }
      }
    }
  }

  /**
   * Scroll to the element with animation
   */
  scrollToElementWithAnimation(element: HTMLElement | null, duration: number, offset: number, subject: Subject<any>) {
    if (element) {
      const viewportOffset = element.getBoundingClientRect();
      const offsetTop = viewportOffset.top + this.topOffset;

      this.doScrolling(element, offsetTop + offset, duration, subject);
    } else {
      subject.error('I don\'t find element');
    }

    return subject;
  }

  private doScrolling(element, elementY, duration, subject: Subject<any>) {
    const startingY = this.topOffset;
    const diff = elementY - startingY;
    let start;

    window.requestAnimationFrame(function step(timestamp) {
      start = (!start) ? timestamp : start;

      const time = timestamp - start;
      element.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'start'});

      if (time < duration) {
        window.requestAnimationFrame(step);
        subject.next(true);
      } else {
        subject.complete();
      }
    });
  }


  /** Scroll to the top of the document. */
  scrollToTop(element?: HTMLElement) {
    this.scrollToElement(element ? element : this.topOfPageElement);
  }

  /**
   * Return the hash fragment from the `PlatformLocation`, minus the leading `#`.
   */
  private getCurrentHash() {
    return decodeURIComponent(this.location.hash.replace(/^#/, ''));
  }

  /**
   * Init reset croll when navigate on other route
   */
  initScroll() {
    // previous url
    let previousRoute = this.router.routerState.snapshot.url;
    // Route subscriber
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((data: NavigationEnd) => {
        // We want to reset the scroll position on navigation except when navigating within
        // the page for a single component.
        if (!this.isNavigationWithinComponentView(previousRoute, data.urlAfterRedirects)) {
          this.resetScrollPosition();
        }

        previousRoute = data.urlAfterRedirects;
      });
  }

  /**
   * If component is new component with a view
   */
  isNavigationWithinComponentView(oldUrl: string, newUrl: string) {
    const componentViewExpression = /components\/(\w+)/;
    return oldUrl && newUrl
      && componentViewExpression.test(oldUrl)
      && componentViewExpression.test(newUrl)
      && oldUrl.match(componentViewExpression)[1] === newUrl.match(componentViewExpression)[1];
  }

  /**
   * Reset scroll top 0 if side nav mat content exists
   */
  resetScrollPosition() {
    if (typeof document === 'object' && document) {
      const sidenavContent = document.querySelector('.main-content');
      if (sidenavContent) {
        sidenavContent.scrollTop = 0;
      }
    }
  }
}
