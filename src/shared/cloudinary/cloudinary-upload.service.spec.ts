import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { environment } from '../../environments/environment.hockey';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CloudinaryUploadService } from './cloudinary-upload.service';
import { Cloudinary } from './cloudinary.service';
import { ProductService } from './../product/product.service';
import { MockProductService } from './../product/mock-product.service';
import { MediaService } from './../media/media.service';
import { MockMediaService } from './../media/mock-media.service';
import { MockCloudinaryService } from './mock-cloudinary.service';
import { SharedModule } from './../shared.module';

describe('CloudinaryUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        SharedModule,
      ],
      providers: [
        CloudinaryUploadService,
        { provide: Cloudinary, useValue: MockCloudinaryService },
        { provide: ProductService, useClass: MockProductService },
        { provide: MediaService, useClass: MockMediaService },
      ]
    });
  });

  it('should be created', inject([CloudinaryUploadService], (service: CloudinaryUploadService) => {
    expect(service).toBeTruthy();
  }));
});
