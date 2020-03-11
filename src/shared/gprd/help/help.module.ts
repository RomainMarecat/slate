import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpListComponent } from './help-list/help-list.component';
import { HelpIconComponent } from './help-icon/help-icon.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

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
