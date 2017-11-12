import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClothingListComponent } from './clothing-list.component';
import { ClothingItemComponent } from './../clothing-item/clothing-item.component';
import { ClothingActionComponent } from './../clothing-item/clothing-action/clothing-action.component';
import { ImageComponent } from './../shared/cloudinary/image/image.component';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from './../shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from './../shared/cloudinary/cloudinary-config';
import { ClothingService } from './../shared/clothing/clothing.service';
import { MockClothingService } from './../shared/clothing/mock-clothing.service';
import { MockUserService } from './../shared/user/mock-user.service';
import { UserService } from './../shared/user/user.service';
import { MockAlertService } from './../shared/alert/mock-alert.service';
import { AlertService } from './../shared/alert/alert.service';
import { LoaderService } from './../shared/loader/loader.service';
import { MockLoaderService } from './../shared/loader/mock-loader.service';
import { ScoreService } from './../shared/score/score.service';
import { MockScoreService } from './../shared/score/mock-score.service';

describe('ClothingListComponent', () => {
  let component: ClothingListComponent;
  let fixture: ComponentFixture < ClothingListComponent > ;

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
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, CloudinaryConfig),
        ],
        declarations: [ClothingListComponent, ClothingItemComponent, ClothingActionComponent, ImageComponent],
        providers: [
          { provide: ClothingService, useClass: MockClothingService },
          { provide: UserService, useClass: MockUserService },
          { provide: AlertService, useClass: MockAlertService },
          { provide: LoaderService, useClass: MockLoaderService },
          { provide: ScoreService, useClass: MockScoreService },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
