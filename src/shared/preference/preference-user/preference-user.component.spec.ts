import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceUserComponent } from './preference-user.component';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MaterialModule } from '../../material/material.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PreferenceUserComponent', () => {
  let component: PreferenceUserComponent;
  let fixture: ComponentFixture<PreferenceUserComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreferenceUserComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
