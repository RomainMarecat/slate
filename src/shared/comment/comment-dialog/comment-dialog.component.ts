import { Component, Inject, OnInit } from '@angular/core';
import { Comment } from '../shared/comment';
import { CommentService } from '../shared/comment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CommentDialogComponent>,
              private commentService: CommentService,
              @Inject(MAT_DIALOG_DATA) public data: {comment: Comment}) {
  }

  ngOnInit() {
  }

  onCommentCreated(comment: Comment) {
    comment = {...comment, ...this.data.comment};
    this.commentService.createComment(comment)
      .subscribe((doc) => {
        comment.key = doc.id;
        this.commentService.updateComment(comment)
          .subscribe(() => {
            this.dialogRef.close(true);
          });
      }, () => {

      });

  }

}
