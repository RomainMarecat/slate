import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageImageComponent } from './storage-image.component';
import { NgPipesModule } from 'ngx-pipes';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Angulartics2Module } from 'angulartics2';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MediaService } from '../../media.service';
import { MockMediaService } from '../../mock-media.service';
import { CommonModule } from '@angular/common';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { StorageDetailComponent } from '../storage-detail/storage-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('StorageImageComponent', () => {
  let component: StorageImageComponent;
  let fixture: ComponentFixture<StorageImageComponent>;

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
        CommonModule,
        AngularFireStorageModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [
        StorageImageComponent,
        StorageDetailComponent
      ],
      providers: [
        {provide: MediaService, useClass: MockMediaService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
