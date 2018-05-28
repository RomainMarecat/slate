import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';
import { MatCardModule, MatExpansionModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    FaqRoutingModule
  ],
  declarations: [
    FaqComponent
  ], exports: [
    FaqComponent
  ]
})
export class FaqModule {
}
