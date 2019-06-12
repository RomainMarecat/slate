import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../../shared.module';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsListComponent } from './cms-list/cms-list.component';
import { CmsDetailComponent } from './cms-detail/cms-detail.component';
import { CmsAddComponent } from './cms-add/cms-add.component';
import { CmsService } from '../../cms/shared/cms.service';
import { TranslateModule } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CmsComponent } from './cms/cms.component';

const TABLE_CMS = new InjectionToken<string>('cms');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    SharedModule,
    NgxDatatableModule,
    CmsRoutingModule
  ],
  declarations: [
    CmsComponent,
    CmsListComponent,
    CmsDetailComponent,
    CmsAddComponent
  ],
  providers: [
    {provide: TABLE_CMS, useValue: 'cms'},
    {provide: CmsService, useClass: CmsService, deps: [AngularFirestore, TABLE_CMS]},

  ]
})
export class CmsModule {
}
