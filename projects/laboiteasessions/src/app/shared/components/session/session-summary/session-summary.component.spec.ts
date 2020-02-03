import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSummaryComponent } from './session-summary.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('SessionSummaryComponent', () => {
  let component: SessionSummaryComponent;
  let fixture: ComponentFixture<SessionSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionSummaryComponent],
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
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
    fixture = TestBed.createComponent(SessionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
