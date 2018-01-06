import { TestBed, inject } from '@angular/core/testing';

import { DeviceService } from './device.service';

describe('DeviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceService]
    });
  });

  it('should be created', inject([DeviceService], (service: DeviceService) => {
    expect(service).toBeTruthy();
  }));
});
