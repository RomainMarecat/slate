import { NgModule } from '@angular/core';
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
import { CmsDetailService } from './../shared/cms-detail/cms-detail.service';

@NgModule({
  imports: [
    CommonModule,
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
    CmsDetailService
  ]
})
export class CmsDetailModule {}
