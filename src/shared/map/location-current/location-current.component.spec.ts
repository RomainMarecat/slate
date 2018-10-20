import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCurrentComponent } from './location-current.component';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MockMapsAPILoader } from '../shared/mock-maps-api-loader';
import { environment } from '../../../app-blog/environments/environment';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('LocationCurrentComponent', () => {
  let component: LocationCurrentComponent;
  let fixture: ComponentFixture<LocationCurrentComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.googleMapApiKey
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ LocationCurrentComponent ],
      providers: [
        {provide: MapsAPILoader, useClass: MockMapsAPILoader},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
