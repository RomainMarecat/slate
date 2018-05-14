import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageDetailComponent } from './storage-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MatProgressBarModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../../app-car/environments/environment';

describe('StorageDetailComponent', () => {
  let component: StorageDetailComponent;
  let fixture: ComponentFixture<StorageDetailComponent>;

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
      declarations: [ StorageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
