import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEditorModule } from 'ngx-editor';

import { SharedModule } from '../../shared.module';
import { CmsDetailRoutingModule } from './cms-detail-routing.module';
import { CmsDetailListComponent } from './cms-detail-list/cms-detail-list.component';
import { CmsDetailAddComponent } from './cms-detail-add/cms-detail-add.component';
import { CmsDetailService } from '../../cms-detail/shared/cms-detail.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CmsService } from 'shared/cms/shared/cms.service';

const TABLE_CMS_DETAIL = new InjectionToken<string>('cms-detail');
const TABLE_CMS = new InjectionToken<string>('cms');

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    NgxEditorModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    TranslateModule,
    SharedModule,
    CmsDetailRoutingModule
  ],
  declarations: [CmsDetailListComponent, CmsDetailAddComponent],
  providers: [
    {provide: TABLE_CMS_DETAIL, useValue: 'cms-detail'},
    {provide: TABLE_CMS, useValue: 'cms'},
    {provide: CmsDetailService, useClass: CmsDetailService, deps: [AngularFirestore, TABLE_CMS_DETAIL]},
    {provide: CmsService, useClass: CmsService, deps: [AngularFirestore, TABLE_CMS]}
  ]
})
export class CmsDetailModule {
}
