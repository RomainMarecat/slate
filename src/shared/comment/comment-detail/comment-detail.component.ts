import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment';
import * as moment from 'moment';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss']
})
export class CommentDetailComponent implements OnInit {
  _comment: Comment;

  constructor() {}

  ngOnInit() {}

  @Input('comment') set comment(comment: Comment) {
    comment.commentTime = moment(comment.commentTime, 'x').format('HH:mm');
    this._comment = comment;
  }

  get comment(): Comment {
    return this._comment;
  }
}
