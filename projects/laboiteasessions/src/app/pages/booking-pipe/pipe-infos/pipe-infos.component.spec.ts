import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastModule } from '../../../layout/toast/toast.module';
import { SelectLanguageModule } from '../../../shared/components/select-language/select-language.module';
import { SelectAgeModule } from '../../../shared/components/select-age/select-age.module';
import { SelectLevelModule } from '../../../shared/components/select-level/select-level.module';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { EventsService } from '../../../shared/services/events.service';
import { ToastService } from '../../../shared/services/toast.service';
import { UserService } from '../../../shared/services/user.service';
import { initialAppState } from '../../../shared/store/app.state';
import { MockStoreModule } from '../../../shared/store/mock/mock-store.module';
import { CartService } from '../../../shared/services/cart.service';
import { BookingPipeService } from '../booking-pipe.service';

import { PipeInfosComponent } from './pipe-infos.component';

describe('PipeInfosComponent', () => {
  let component: PipeInfosComponent;
  let fixture: ComponentFixture<PipeInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PipeInfosComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SelectLanguageModule,
        NoopAnimationsModule,
        SelectLevelModule,
        SelectAgeModule,
        ToastModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
        MockStoreModule.forRoot('app', initialAppState),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        ToastService,
        AuthenticationService,
        BookingPipeService,
        UserService,
        CartService,
        EventsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
