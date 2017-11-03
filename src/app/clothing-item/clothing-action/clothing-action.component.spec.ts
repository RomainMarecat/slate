import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatLineModule,
  MatMenuModule,
  MatCommonModule,
  MatTooltipModule
} from '@angular/material';
import { ClothingActionComponent } from './clothing-action.component';
import { MockClothingService } from './../../shared/clothing/mock-clothing.service';
import { MockUserService } from './../../shared/user/mock-user.service';
import { UserService } from './../../shared/user/user.service';
import { MockAlertService } from './../../shared/alert/mock-alert.service';
import { AlertService } from './../../shared/alert/alert.service';
import { ScoreService } from './../../shared/score/score.service';
import { MockScoreService } from './../../shared/score/mock-score.service';

describe('ClothingActionComponent', () => {
  let component: ClothingActionComponent;
  let fixture: ComponentFixture < ClothingActionComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          RouterTestingModule,
          BrowserModule,
          HttpModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          MatCardModule,
          MatIconModule,
          MatButtonModule,
          MatGridListModule,
          MatInputModule,
          MatCheckboxModule,
          MatListModule,
        ],
        declarations: [ClothingActionComponent],
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: AlertService, useClass: MockAlertService },
          { provide: ScoreService, useClass: MockScoreService },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
