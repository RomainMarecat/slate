import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';
import { MatCardModule, MatExpansionModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    FaqRoutingModule,
    TranslateModule,
  ],
  declarations: [
    FaqComponent
  ], exports: [
    FaqComponent
  ]
})
export class FaqModule {
}
