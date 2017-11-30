import { TestBed, inject } from '@angular/core/testing';

import { CmsDetailService } from './cms-detail.service';

describe('CmsDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CmsDetailService]
    });
  });

  it('should be created', inject([CmsDetailService], (service: CmsDetailService) => {
    expect(service).toBeTruthy();
  }));
});
