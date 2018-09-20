import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpListComponent } from './help-list/help-list.component';
import { HelpIconComponent } from './help-icon/help-icon.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { MatCardModule, MatDialogModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule,
  ],
  declarations: [
    HelpListComponent,
    HelpIconComponent,
    HelpDialogComponent
  ],
  exports: [
    HelpListComponent,
    HelpIconComponent,
    HelpDialogComponent
  ]
})
export class HelpModule {
}
