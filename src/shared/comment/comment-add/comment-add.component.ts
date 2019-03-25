import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Comment } from '../shared/comment';
@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss']
})
export class CommentAddComponent implements OnInit {
  form: FormGroup;

  @Output() commentCreated: EventEmitter < Comment > = new EventEmitter < Comment > ();

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

  reset() {
    this.form.reset({
      commentText: ''
    });
  }

  addCommentForm() {

  }

  addComment() {
    if (this.form.valid) {
      this.commentCreated.emit(this.form.value);
      this.reset();
    }
  }
}
