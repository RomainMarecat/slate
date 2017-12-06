import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgStringPipesModule } from 'angular-pipes';
import { environment } from './../../../environments/environment.monpullmoche';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatLineModule,
  MatMenuModule,
  MatCommonModule,
  MatTooltipModule,
  MatExpansionModule,
  MatStepperModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEditorModule } from 'ngx-editor';

import { SharedModule } from '../../../core/shared/shared.module';
import { CmsDetailRoutingModule } from './cms-detail-routing.module';
import { CmsDetailListComponent } from './cms-detail-list/cms-detail-list.component';
import { CmsDetailAddComponent } from './cms-detail-add/cms-detail-add.component';
import { CmsDetailService } from './../shared/cms-detail/cms-detail.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgStringPipesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatLineModule,
    MatExpansionModule,
    MatMenuModule,
    MatCommonModule,
    MatTooltipModule,
    MatStepperModule,
    NgxEditorModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule,
    CmsDetailRoutingModule
  ],
  declarations: [CmsDetailListComponent, CmsDetailAddComponent],
  providers: [
    CmsDetailService
  ]
})
export class CmsDetailModule {}
