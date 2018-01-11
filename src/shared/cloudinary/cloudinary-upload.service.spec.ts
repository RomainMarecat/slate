import { TestBed, inject } from '@angular/core/testing';

import { CloudinaryUploadService } from './cloudinary-upload.service';

describe('CloudinaryUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CloudinaryUploadService]
    });
  });

  it('should be created', inject([CloudinaryUploadService], (service: CloudinaryUploadService) => {
    expect(service).toBeTruthy();
  }));
});
