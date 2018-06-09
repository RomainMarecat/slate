import { TestBed, inject } from '@angular/core/testing';

import { BoardService } from './board.service';
import { MockBoardService } from './mock-board.service';

describe('BoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: BoardService, useClass: MockBoardService}
      ]
    });
  });

  it('should be created', inject([BoardService], (service: BoardService) => {
    expect(service).toBeTruthy();
  }));
});
