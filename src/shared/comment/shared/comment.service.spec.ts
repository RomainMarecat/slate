import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { MockCommentService } from './mock-comment.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { CommentService } from './comment.service';
import { environment } from '../../../app-hockey/environments/environment';

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
