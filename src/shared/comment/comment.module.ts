import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
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
