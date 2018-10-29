import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { A2hsRoutingModule } from './a2hs-routing.module';
import { A2hsBrowserPromptComponent } from './a2hs-browser-prompt/a2hs-browser-prompt.component';
import { A2hsIosSafariHowComponent } from './a2hs-ios-safari-how/a2hs-ios-safari-how.component';
import { A2hsComponent } from './a2hs/a2hs.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    A2hsRoutingModule
  ],
  declarations: [
    A2hsBrowserPromptComponent,
    A2hsIosSafariHowComponent,
    A2hsComponent
  ]
})
export class A2hsModule {
}
