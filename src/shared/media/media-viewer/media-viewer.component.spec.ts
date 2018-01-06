import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaViewerComponent } from './media-viewer.component';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { NgStringPipesModule } from 'angular-pipes';
import { Cloudinary } from '../../cloudinary/cloudinary.service';
import { environment } from '../../../environments/environment.hockey';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2Module } from 'angulartics2';
import { MediaService } from '../media.service';
import { MockMediaService } from '../mock-media.service';

describe('MediaViewerComponent', () => {
  let component: MediaViewerComponent;
  let fixture: ComponentFixture < MediaViewerComponent > ;

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
        declarations: [MediaViewerComponent],
        providers: [
          { provide: MediaService, useClass: MockMediaService },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
