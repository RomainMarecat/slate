import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Angulartics2Module } from 'angulartics2';
import { NgPipesModule } from 'ngx-pipes';
import { CloudinaryModule } from '../cloudinary.module';
import { ImageComponent } from './image.component';
import { MediaService } from '../../media.service';
import { MockMediaService } from '../../mock-media.service';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { StorageModule } from '../../storage/storage.module';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { CloudinaryImageSourceDirective } from '../cloudinary-image-source.directive';
import { CloudinaryImageComponent } from '../cloudinary-image/cloudinary-image.component';
import { CloudinaryTransformationDirective } from '../cloudinary-transformation.directive';
import { CloudinaryVideoComponent } from '../cloudinary-video/cloudinary-video.component';
import { ImageProductComponent } from '../image-product/image-product.component';
import { MediaViewerComponent } from '../media-viewer/media-viewer.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ngx-img-cropper';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgPipesModule,
        AngularFireStorageModule,
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        FileUploadModule,
        ImageCropperModule,
        StorageModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [
        CloudinaryImageSourceDirective,
        CloudinaryImageComponent,
        CloudinaryTransformationDirective,
        CloudinaryVideoComponent,
        ImageProductComponent,
        ImageComponent,
        MediaViewerComponent
      ],
      providers: [
        {provide: MediaService, useClass: MockMediaService},

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
