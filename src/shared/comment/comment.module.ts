import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommentAddComponent } from './comment-add/comment-add.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  entryComponents: [
    CommentDialogComponent
  ],
  declarations: [
    CommentAddComponent,
    CommentListComponent,
    CommentEditComponent,
    CommentDetailComponent,
    CommentDialogComponent
  ],
  exports: [
    CommentAddComponent,
    CommentListComponent,
    CommentEditComponent,
    CommentDetailComponent,
    CommentDialogComponent
  ]
})
export class CommentModule {
}
