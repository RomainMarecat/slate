import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { MediaService } from './media.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MockMediaService } from './mock-media.service';

import { Cloudinary } from './cloudinary/cloudinary.service';
import CloudinaryConfiguration from './cloudinary/cloudinary-configuration.class';
import { environment } from '../../app-hockey/environments/environment';

const cloudName = 'services-test';
describe('MediaService', () => {
  const config: CloudinaryConfiguration = {
    cloud_name: cloudName
  };
  const cloudinaryCore = require('cloudinary-core');
  const mockCloudinaryService: Cloudinary = new Cloudinary(cloudinaryCore, config);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        { provide: MediaService, useClass: MockMediaService },
        { provide: Cloudinary, useValue: mockCloudinaryService },
      ]
    });
  });

  it('should be created', inject([MediaService], (service: MediaService) => {
    expect(service).toBeTruthy();
  }));
});
