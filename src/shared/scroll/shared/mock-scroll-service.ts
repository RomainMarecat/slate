import { Observable, of, Subject } from 'rxjs';

export class MockScrollService {
  // tslint:disable
  private _topOffset: number | null;
  private _topOfPageElement: HTMLElement;
  // tslint:enable
  // Offset from the top of the document to bottom of any static elements
  // at the top (e.g. toolbar) + some margin
  get topOffset() {
    return 0;
  }

  get topOfPageElement() {
    return 0;
  }

  scrollTo(element: string | HTMLElement, duration: number = 500, offset: number = 0): Observable<any> {
    return of(true);
  }

  /**
   * Scroll to the element with id extracted from the current location hash fragment.
   * Scroll to top if no hash.
   * Don't scroll if hash not found.
   */
  scroll() {
  }

  /**
   * Scroll to the element.
   * Don't scroll if no element.
   */
  scrollToElement(element: Element | null) {
  }

  /**
   * Scroll to the element with animation
   */
  scrollToElementWithAnimation(element: HTMLElement | null, duration: number, offset: number, subject: Subject<any>) {
  }

  private doScrolling(element, elementY, duration, subject: Subject<any>) {
  }


  /** Scroll to the top of the document. */
  scrollToTop() {
  }

  /**
   * Return the hash fragment from the `PlatformLocation`, minus the leading `#`.
   */
  private getCurrentHash() {
  }
}
