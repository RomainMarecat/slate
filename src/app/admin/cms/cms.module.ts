import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { CmsListComponent } from './cms-list/cms-list.component';
import { CmsDetailComponent } from './cms-detail/cms-detail.component';
import { CmsAddComponent } from './cms-add/cms-add.component';
import { CmsService } from './../shared/cms/cms.service';

@NgModule({
  imports: [
    CommonModule,
    CmsRoutingModule
  ],
  declarations: [CmsComponent, CmsListComponent, CmsDetailComponent, CmsAddComponent],
  providers: [CmsService]
})
export class CmsModule { }
