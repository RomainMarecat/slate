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

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgPipesModule,
        AngularFireStorageModule,
        Angulartics2Module.forRoot( {
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        CloudinaryModule,
        StorageModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [ImageComponent],
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
