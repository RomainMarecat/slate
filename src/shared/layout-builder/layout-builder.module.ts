import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutBuilderRoutingModule } from './layout-builder-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { SharedLayoutBuilderModule } from './shared-layout-builder.module';
import { ThemeStorageService } from './shared/theme-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    LayoutBuilderRoutingModule,
    SharedLayoutBuilderModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    TranslateModule
  ],
  providers: [
    ThemeStorageService
  ]
})
export class LayoutBuilderModule {
}
