import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SecurityModule } from '../../security/security.module';
import { AuthService } from '../../../shared/services/auth.service';

import { PipeLoginComponent } from './pipe-login.component';

describe('PipeLoginComponent', () => {
  let component: PipeLoginComponent;
  let fixture: ComponentFixture<PipeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PipeLoginComponent],
      imports: [
        NoopAnimationsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
        MatSnackBarModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        HttpClientTestingModule,
        RouterTestingModule,
        SecurityModule
      ],
      providers: [
        AuthService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
