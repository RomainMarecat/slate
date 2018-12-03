import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageDetailComponent } from './storage-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatProgressBarModule } from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../app-car/environments/environment';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('StorageDetailComponent', () => {
  let component: StorageDetailComponent;
  let fixture: ComponentFixture<StorageDetailComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        HttpClientTestingModule,
        MatProgressBarModule
      ],
      declarations: [StorageDetailComponent]
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
