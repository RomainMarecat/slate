import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgStringPipesModule } from 'angular-pipes';
import { environment } from './../../../environments/environment.hockey';
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

import { SharedModule } from '../../shared.module';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { CmsListComponent } from './cms-list/cms-list.component';
import { CmsDetailComponent } from './cms-detail/cms-detail.component';
import { CmsAddComponent } from './cms-add/cms-add.component';
import { CmsService } from './../shared/cms/cms.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgStringPipesModule,
    NgxEditorModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    NgxDatatableModule,
    CmsRoutingModule
  ],
  declarations: [CmsComponent, CmsListComponent, CmsDetailComponent, CmsAddComponent],
  providers: [CmsService]
})
export class CmsModule {}