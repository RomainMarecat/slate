import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutBuilderRoutingModule } from './layout-builder-routing.module';
import { LayoutBuilderEditComponent } from './layout-builder-edit/layout-builder-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTooltipModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeStorageService } from 'shared/layout-builder/shared/theme-storage.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    LayoutBuilderRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    TranslateModule
  ],
  declarations: [LayoutBuilderEditComponent],
  providers: [
    ThemeStorageService
  ]
})
export class LayoutBuilderModule {
}
