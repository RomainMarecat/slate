import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AttributeListComponent } from './attribute-list.component';
import { AttributeEditComponent } from './../attribute-edit/attribute-edit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../../shared.module';
import { MediaService } from '../../../media/media.service';
import { MockMediaService } from '../../../media/mock-media.service';
import { MenuService } from '../../../menu/menu.service';
import { AttributeService } from '../../../attribute/attribute.service';
import { MockAttributeService } from '../../../attribute/mock-attribute.service';

import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';

describe('AttributeListComponent', () => {
  let component: AttributeListComponent;
  let fixture: ComponentFixture < AttributeListComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserModule,
          HttpClientModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          NgxDatatableModule,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
          SharedModule,
        ],
        declarations: [AttributeListComponent, AttributeEditComponent],
        providers: [
          MenuService,
          { provide: AlertService, useClass: MockAlertService },
          { provide: AttributeService, useClass: MockAttributeService },
          { provide: MediaService, useClass: MockMediaService },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
