import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss']
})
export class CommentAddComponent implements OnInit {
  form: FormGroup;

  @Output() comment: Comment;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      'commentText': new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2000)
      ])
    });
  }

  addCommentForm() {

  }

  addComment() {
    if (this.form.valid) {
      this.comment = this.form.value;
    }
  }

  get commentText() {
    return this.form.get('commentText');
  }

  set commentText(commentText) {
    this.form.patchValue({ commentText: commentText });
  }
}
