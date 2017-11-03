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
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import { CloudinaryConfig } from './../shared/cloudinary/cloudinary-config';
import { ClothingActionComponent } from './../clothing-item/clothing-action/clothing-action.component';
import { MockClothingService } from './../shared/clothing/mock-clothing.service';
import { ClothingService } from './../shared/clothing/clothing.service';
import { ClothingDetailComponent } from './clothing-detail.component';
import { ImageComponent } from './../shared/cloudinary/image/image.component';

describe('ClothingDetailComponent', () => {
  let component: ClothingDetailComponent;
  let fixture: ComponentFixture < ClothingDetailComponent > ;

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
        declarations: [ClothingDetailComponent, ClothingActionComponent, ImageComponent],
        providers: [
          { provide: ClothingService, useClass: MockClothingService },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
