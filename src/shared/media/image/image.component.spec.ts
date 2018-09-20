import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NgPipesModule } from 'ngx-pipes';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImageComponent } from './image.component';
import { MediaService } from '../media.service';
import { MockMediaService } from '../mock-media.service';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { StorageModule } from '../storage/storage.module';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgPipesModule,
        AngularFireStorageModule,
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
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
