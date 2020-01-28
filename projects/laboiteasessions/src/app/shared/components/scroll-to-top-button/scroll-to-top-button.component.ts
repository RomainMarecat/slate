import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scroll-to-top-button',
  templateUrl: './scroll-to-top-button.component.html',
  styleUrls: ['./scroll-to-top-button.component.scss'],
  animations: [
    trigger('scrollState', [
      state('hide', style({
        opacity: '0',
        display: 'none',
      })),
      state('show', style({
        opacity: '1',
        display: 'block',
      })),
      transition('show => hide', animate('0.2s ease-in-out')),
      transition('hide => show', animate('0.2s ease-in-out'))

    ])
  ]
})
export class ScrollToTopButtonComponent {

  @Output() topPage: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() pagedScrolled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() scrollTopButton: ElementRef;

  windowScrolled: 'show' | 'hide' = 'hide';

  constructor(@Inject(DOCUMENT) private document: any,
              private router: Router) {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.router.url === '/') {
      if (this.isAtBottomOfPage()) {
        this.showWindowScroll();
      } else if (this.isAtTopOfPage()) {
        this.hideWindowScroll();
      }
      return;
    }
    this.pagedScrolled.emit(true);
  }

  isAtTopOfPage(): boolean {
    return (this.windowScrolled && window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 900) as boolean;
  }

  isAtBottomOfPage(): boolean {
    return (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 900) as boolean;
  }

  showWindowScroll() {
    this.windowScrolled = 'show';
    this.pagedScrolled.emit(true);
  }

  hideWindowScroll() {
    this.windowScrolled = 'hide';
    this.pagedScrolled.emit(false);
  }
}
