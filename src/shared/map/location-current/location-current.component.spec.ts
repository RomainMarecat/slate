import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../app-blog/environments/environment';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MapService } from '../shared/map.service';
import { MockMapService } from '../shared/mock-map.service';
import { MockMapsAPILoader } from '../shared/mock-maps-api-loader';

import { LocationCurrentComponent } from './location-current.component';

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
        AngularFireStorageModule,
        CommonModule,
        HttpClientTestingModule,
        LeafletModule.forRoot(),
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [LocationCurrentComponent],
      providers: [
        {provide: MapsAPILoader, useClass: MockMapsAPILoader},
        {provide: MapService, useClass: MockMapService},
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
