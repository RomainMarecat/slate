import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgStringPipesModule } from 'angular-pipes';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from './../cloudinary.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CloudinaryConfig } from './../cloudinary-config';
import { ImageComponent } from './image.component';
import { MediaService } from './../../media/media.service';
import { MockMediaService } from './../../media/mock-media.service';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture < ImageComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CloudinaryModule,
          NgStringPipesModule,
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, CloudinaryConfig),
        ],
        declarations: [ImageComponent],
        providers: [
          { provide: MediaService, useClass: MockMediaService },

        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
