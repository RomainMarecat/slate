import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderModule } from '../../../shared/components/loader/loader.module';
import { SelectCityTeachedModule } from '../../../shared/components/select-city-teached/select-city-teached.module';
import { CityTeachedService } from '../../../shared/services/city-teached.service';
import { GoogleApisService } from '../../../shared/services/google-apis.service';

import { MapComponent } from './map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { JwtModule } from '@auth0/angular-jwt';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [
        SelectCityTeachedModule,
        NoopAnimationsModule,
        LeafletModule,
        HttpClientTestingModule,
        LoaderModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
      ],
      providers: [
        GoogleApisService,
        CityTeachedService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
