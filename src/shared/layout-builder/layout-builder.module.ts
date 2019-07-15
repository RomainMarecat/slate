import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutBuilderRoutingModule } from './layout-builder-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTooltipModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SharedLayoutBuilderModule } from './shared-layout-builder.module';
import { ThemeStorageService } from './shared/theme-storage.service';

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
