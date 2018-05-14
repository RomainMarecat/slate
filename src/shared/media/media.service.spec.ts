import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { MediaService } from './media.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MockMediaService } from './mock-media.service';

import { Cloudinary } from './cloudinary/cloudinary.service';
import CloudinaryConfiguration from './cloudinary/cloudinary-configuration.class';
import { environment } from '../../app-hockey/environments/environment';

const cloudName = 'service-test';
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
