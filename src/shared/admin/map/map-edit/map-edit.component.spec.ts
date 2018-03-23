///<reference path="../../../../../node_modules/@ngx-translate/core/src/translate.loader.d.ts"/>
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEditComponent } from './map-edit.component';
import { SharedModule } from '../../../shared.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AlertService } from '../../../popup/alert.service';
import { MenuService } from '../../../menu/menu.service';
import { AreaService } from '../../../map/shared/area.service';
import { MockMapService } from '../../../map/shared/mock-map.service';
import { MapService } from '../../../map/shared/map.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { MockAreaService } from '../../../map/shared/mock-area.service';
import { MapAreasComponent } from '../map-areas/map-areas.component';

describe('MapEditComponent', () => {
  let component: MapEditComponent;
  let fixture: ComponentFixture<MapEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        SharedModule,
        RouterTestingModule,
      ],
      declarations: [ MapEditComponent, MapAreasComponent ],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: MenuService, useClass: MenuService},
        {provide: AreaService, useClass: MockAreaService},
        {provide: MapService, useClass: MockMapService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
