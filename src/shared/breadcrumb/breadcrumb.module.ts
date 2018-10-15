import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { MatIconModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule.forChild(),
    LocalizeRouterModule
  ],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {
}
