import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScrollToTopButtonComponent } from './scroll-to-top-button.component';

@NgModule({
  declarations: [
    ScrollToTopButtonComponent
  ],
  imports: [
    MatIconModule,
  ],
  exports: [
    ScrollToTopButtonComponent
  ]
})
export class ScrollToTopButtonModule {
}
