import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutBuilderEditComponent } from './layout-builder-edit/layout-builder-edit.component';
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
