import { ModuleWithProviders, NgModule } from '@angular/core';
import { ScrollService } from './shared/scroll.service';
import { CommonModule } from '@angular/common';
import { ScrollToDirective } from './scroll-to.directive';
import { InfiniteScrollerDirective } from './infinite-scroller.directive';

@NgModule({
  declarations: [
    ScrollToDirective,
    InfiniteScrollerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScrollToDirective,
    InfiniteScrollerDirective
  ],
  providers: [
    ScrollService,
  ]
})
export class ScrollModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ScrollModule
    };
  }
}
