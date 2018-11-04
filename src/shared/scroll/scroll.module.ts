import { ModuleWithProviders, NgModule } from '@angular/core';
import { ScrollService } from './shared/scroll.service';
import { CommonModule } from '@angular/common';
import { ScrollToDirective } from './scroll-to.directive';

@NgModule({
  declarations: [
    ScrollToDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScrollToDirective
  ],
  providers: [
    ScrollService
  ]
})
export class ScrollModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ScrollModule
    };
  }
}
