import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCurrentComponent } from './location-current.component';
import { environment } from '../../../environments/environment.blog';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MockMapsAPILoader } from '../shared/mock-maps-api-loader';

describe('LocationCurrentComponent', () => {
  let component: LocationCurrentComponent;
  let fixture: ComponentFixture<LocationCurrentComponent>;

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
