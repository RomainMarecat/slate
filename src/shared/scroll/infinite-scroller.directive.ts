import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { exhaustMap, filter, map, pairwise, startWith, tap } from 'rxjs/operators';

export interface ScrollPosition {
  sH: number;
  sT: number;
  cH: number;
}

export const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  sH: 0,
  sT: 0,
  cH: 0
};

@Directive({
  selector: '[appInfiniteScroller]'
})
export class InfiniteScrollerDirective implements AfterViewInit {

  private scrollEvent$;

  private userScrolledDown$;

  private requestStream$;

  private requestOnScroll$;

  @Input() scrollCallback;

  @Input() immediateCallback;

  @Input() scrollPercent = 70;

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {

    this.registerScrollEvent();

    this.streamScrollEvents();

    this.requestCallbackOnScroll();
  }

  private registerScrollEvent() {
    this.scrollEvent$ = fromEvent(this.element.nativeElement, 'scroll');
  }

  private streamScrollEvents() {
    this.userScrolledDown$ = this.scrollEvent$
      .pipe(
        tap((val) => {
          console.log(val);
        }),
        map((e: any): ScrollPosition => ({
          sH: e.target.scrollHeight,
          sT: e.target.scrollTop,
          cH: e.target.clientHeight
        })),
        pairwise(),
        filter(positions => {
          console.log(positions);
          return this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]);
        })
      );
  }

  private requestCallbackOnScroll() {

    this.requestOnScroll$ = this.userScrolledDown$;

    if (this.immediateCallback) {
      this.requestOnScroll$ = this.requestOnScroll$
        .pipe(
          startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION])
        );
    }

    this.requestOnScroll$
      .pipe(
        exhaustMap(() => {
          console.log('exhaustMap');
          return this.scrollCallback();
        })
      ).subscribe((value) => {
      console.log('subscriber', value);
    });

  }

  private isUserScrollingDown = (positions) => {
    console.log(positions);
    return positions[0].sT < positions[1].sT;
  }

  private isScrollExpectedPercent = (position) => {
    console.log(position);
    return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
  }
}
