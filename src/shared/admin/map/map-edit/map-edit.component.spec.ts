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
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MockLocalizeRouterService } from 'shared/router/mock-localize-router.service';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('MapEditComponent', () => {
  let component: MapEditComponent;
  let fixture: ComponentFixture<MapEditComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientTestingModule,
        LocalizeRouterModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        SharedModule,
        RouterTestingModule,
      ],
      declarations: [MapEditComponent, MapAreasComponent],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: MenuService, useClass: MenuService},
        {provide: AreaService, useClass: MockAreaService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
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
