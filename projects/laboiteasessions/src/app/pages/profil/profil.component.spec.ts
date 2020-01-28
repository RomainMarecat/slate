import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastModule } from '../../layout/toast/toast.module';
import { AgendaModule } from '../../shared/components/agenda/agenda.module';
import { ParameterService } from '../../shared/parameter/parameter.service';
import { CityTeachedService } from '../../shared/services/city-teached.service';
import { CountryService } from '../../shared/services/country.service';
import { UserService } from '../../shared/services/user.service';
import { OnlineSessionService } from '../../shared/services/online-session.service';
import { ProfilService } from '../../shared/services/profil.service';
import { SportTeachedService } from '../../shared/services/sport-teached.service';
import { initialAppState } from '../../shared/store/app.state';
import { MockStoreModule } from '../../shared/store/mock/mock-store.module';
import { CartService } from '../cart/shared/cart.service';
import { CartModule } from './cart/cart.module';
import { MapModule } from './map/map.module';
import { NavigationModule } from './navigation/navigation.module';
import { NotFoundModule } from './not-found/not-found.module';
import { OverviewModule } from './overview/overview.module';

import { ProfilComponent } from './profil.component';

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
        MatCardModule,
        AgendaModule,
        RouterTestingModule,
        MapModule,
        OverviewModule,
        NotFoundModule,
        NavigationModule,
        CartModule,
        ToastModule,
        MockStoreModule.forRoot('app', initialAppState),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        UserService,
        CartService,
        ParameterService,
        ProfilService,
        CountryService,
        OnlineSessionService,
        CityTeachedService,
        SportTeachedService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
