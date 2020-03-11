import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageUploadComponent } from './storage-upload.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockMediaService } from '../../mock-media.service';
import { MediaService } from '../../media.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { environment } from '../../../../app-car/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

describe('StorageUploadComponent', () => {
  let component: StorageUploadComponent;
  let fixture: ComponentFixture<StorageUploadComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        HttpClientTestingModule,
        MatProgressBarModule,
        MatInputModule,
        MatIconModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        {provide: MediaService, useClass: MockMediaService},
        {provide: AlertService, useClass: MockAlertService},
      ],
      declarations: [StorageUploadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
