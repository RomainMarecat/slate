import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingImageComponent } from './clothing-image.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import {
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule
} from '@angular/material';

describe('ClothingImageComponent', () => {
  let component: ClothingImageComponent;
  let fixture: ComponentFixture<ClothingImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ImageCropperModule,
        FileUploadModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatFormFieldModule
      ],
      declarations: [ ClothingImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
