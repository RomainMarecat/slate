import { TestBed } from '@angular/core/testing';

import { CheckForUpdateService } from './check-for-update.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MockCheckForUpdateService } from './mock-check-for-update.service';

describe('CheckForUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ServiceWorkerModule
    ],
    providers: [
      {provide: CheckForUpdateService, useClass: MockCheckForUpdateService}
    ]
  }));

  it('should be created', () => {
    const service: CheckForUpdateService = TestBed.get(CheckForUpdateService);
    expect(service).toBeTruthy();
  });
});
