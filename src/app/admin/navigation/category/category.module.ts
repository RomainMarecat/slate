import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgStringPipesModule } from 'angular-pipes';
import { environment } from './../../../../environments/environment.monpullmoche';
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

import { SharedModule } from '../../../../core/shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category.component';
import { CategoryService } from './../../shared/navigation/category/category.service';
import { CategoryAddComponent } from './category-add/category-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
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
    CategoryRoutingModule
  ],
  declarations: [CategoryListComponent, CategoryComponent, CategoryAddComponent],
  providers: [
    CategoryService
  ]
})
export class CategoryModule {}
