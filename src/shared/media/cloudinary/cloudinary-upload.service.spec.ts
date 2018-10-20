import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CloudinaryUploadService } from './cloudinary-upload.service';
import { Cloudinary } from './cloudinary.service';
import { SharedModule } from '../../shared.module';
import { MockCloudinaryService } from './mock-cloudinary.service';
import { ProductService } from '../../product/shared/product.service';
import { MockProductService } from '../../product/shared/mock-product.service';
import { MediaService } from '../media.service';
import { MockMediaService } from '../mock-media.service';
import { environment } from '../../../app-hockey/environments/environment';

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
        {provide: Cloudinary, useValue: MockCloudinaryService},
        {provide: ProductService, useClass: MockProductService},
        {provide: MediaService, useClass: MockMediaService},
      ]
    });
  });

  it('should be created', inject([ CloudinaryUploadService ], (service: CloudinaryUploadService) => {
    expect(service).toBeTruthy();
  }));
});
