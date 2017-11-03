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
import { ClothingItemComponent } from './clothing-item.component';
import { ClothingActionComponent } from './clothing-action/clothing-action.component';
import { ImageComponent } from './../shared/cloudinary/image/image.component';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import { CloudinaryConfig } from './../shared/cloudinary/cloudinary-config';

describe('ClothingItemComponent', () => {
  let component: ClothingItemComponent;
  let fixture: ComponentFixture < ClothingItemComponent > ;

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
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, CloudinaryConfig),
        ],
        declarations: [ClothingItemComponent, ClothingActionComponent, ImageComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
