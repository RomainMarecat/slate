import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTooltipModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutBuilderEditComponent } from './layout-builder-edit/layout-builder-edit.component';
import { ThemeStorageService } from './shared/theme-storage.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    TranslateModule
  ],
  declarations: [
    LayoutBuilderEditComponent
  ],
  exports: [
    LayoutBuilderEditComponent
  ],
  providers: [
    ThemeStorageService
  ]
})
export class SharedLayoutBuilderModule {
}
