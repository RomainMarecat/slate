import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageUploadComponent } from './storage-upload.component';
import { MatProgressBarModule } from '@angular/material';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.menincar';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StorageUploadComponent', () => {
  let component: StorageUploadComponent;
  let fixture: ComponentFixture<StorageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        HttpClientTestingModule,
        MatProgressBarModule
      ],
      declarations: [ StorageUploadComponent ]
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
