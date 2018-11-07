import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { ScrollService } from './shared/scroll.service';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective implements OnInit {

  @Input() scrollTo: any;

  @Input() scrollDuration: number;

  @Input() scrollOffset: number;

  constructor(private scrollService: ScrollService) {
  }

  ngOnInit(): void {
    this.scrollDuration = (!this.scrollDuration) ? 500 : this.scrollDuration;
    this.scrollOffset = (!this.scrollOffset) ? 0 : this.scrollOffset;
  }

  @HostListener('mousedown')
  onMouseClick() {
    this.scrollService.scrollTo(this.scrollTo, this.scrollDuration, this.scrollOffset);
  }
}
