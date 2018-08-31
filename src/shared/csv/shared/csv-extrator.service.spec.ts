import { TestBed, inject } from '@angular/core/testing';

import { CsvExtratorService } from './csv-extrator.service';

describe('CsvExtratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsvExtratorService]
    });
  });

  it('should be created', inject([CsvExtratorService], (service: CsvExtratorService) => {
    expect(service).toBeTruthy();
  }));
});
