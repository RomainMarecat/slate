import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { MockCommentService } from './mock-comment.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { CommentService } from './comment.service';
import { environment } from '../../app-hockey/environments/environment';

describe('CommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        {provide: CommentService, useClass: MockCommentService}
      ]
    });
  });

  it('should be created', inject([ CommentService ], (service: CommentService) => {
    expect(service).toBeTruthy();
  }));
});
