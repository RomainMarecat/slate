import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetFormComponent } from './password-reset-form.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStoreModule } from '../../../shared/store/mock/mock-store.module';
import { initialAppState } from '../../../shared/store/app.state';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { JwtModule } from '@auth0/angular-jwt';

describe('PasswordResetFormComponent', () => {
  let component: PasswordResetFormComponent;
  let fixture: ComponentFixture<PasswordResetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetFormComponent],
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MockStoreModule.forRoot('app', initialAppState),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {
          provide: MatDialogRef, useValue: {
            close: () => {
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
