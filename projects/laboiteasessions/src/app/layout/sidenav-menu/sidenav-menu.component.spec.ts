import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../shared/services/cart.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { initialAppState } from '../../shared/store/app.state';
import { MockStoreModule } from '../../shared/store/mock/mock-store.module';
import { SidenavMenuComponent } from './sidenav-menu.component';

describe('SidenavMenuComponent', () => {
  let component: SidenavMenuComponent;
  let fixture: ComponentFixture<SidenavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatIconModule,
        RouterTestingModule.withRoutes([
          {path: '', component: SidenavMenuComponent}
        ]),
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        MockStoreModule.forRoot('app', initialAppState),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
      ],
      declarations: [SidenavMenuComponent],
      providers: [
        AuthenticationService,
        CartService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
