import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommentAddComponent } from './comment-add/comment-add.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
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
  MatTooltipModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    CommentAddComponent,
    CommentListComponent,
    CommentEditComponent,
    CommentDetailComponent
  ],
  exports: [
    CommentAddComponent,
    CommentListComponent,
    CommentEditComponent,
    CommentDetailComponent
  ]
})
export class CommentModule {}
