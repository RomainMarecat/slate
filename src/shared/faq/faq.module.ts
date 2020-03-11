import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    FaqRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    FaqComponent
  ],
  exports: [
    FaqComponent
  ]
})
export class FaqModule {
}
