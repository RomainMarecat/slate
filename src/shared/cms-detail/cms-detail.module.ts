import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsDetailRoutingModule } from './cms-detail-routing.module';
import { CmsDetailComponent } from './cms-detail/cms-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    CmsDetailRoutingModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ],
  declarations: [
    CmsDetailComponent
  ],
  exports: [
    CmsDetailComponent
  ]
})
export class CmsDetailModule {
}
