import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionSummaryComponent } from './session-summary.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SessionSummaryComponent],
  exports: [SessionSummaryComponent],
  entryComponents: [SessionSummaryComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule.forChild()
  ]
})
export class SessionSummaryModule {
}
