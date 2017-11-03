import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';
import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatListModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MAT_SNACK_BAR_DATA
} from '@angular/material';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture < AlertComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          BrowserModule,
          CommonModule,
          HttpModule,
          BrowserAnimationsModule,
          MatIconModule,
          MatSnackBarModule,
        ],
        declarations: [AlertComponent],
        providers: [{
          provide: MAT_SNACK_BAR_DATA,
          useValue: {},
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
