import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NgStringPipesModule } from 'angular-pipes';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../cloudinary.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CloudinaryConfig } from '../cloudinary-config';
import { ImageComponent } from './image.component';
import { MediaService } from '../../media/media.service';
import { MockMediaService } from '../../media/mock-media.service';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { environment } from './../../../../environments/environment.monpullmoche';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture < ImageComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CloudinaryModule,
          NgStringPipesModule,
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, environment.cloudinary),
          Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
            developerMode: true,
            pageTracking: {
              clearIds: true,
            },
          }),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          })
        ],
        declarations: [],
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
