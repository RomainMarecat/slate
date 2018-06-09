import { TestBed, inject } from '@angular/core/testing';

import { ColumnService } from './column.service';
import { MockColumnService } from './mock-column.service';

describe('ColumnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ColumnService, useClass: MockColumnService}
      ]
    });
  });

  it('should be created', inject([ColumnService], (service: ColumnService) => {
    expect(service).toBeTruthy();
  }));
});
