import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAreasComponent } from './map-areas.component';
import { SharedModule } from '../../../shared.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../popup/alert.service';
import { MenuService } from '../../../menu/menu.service';
import { AreaService } from '../../../map/shared/area.service';
import { MapService } from '../../../map/shared/map.service';
import { MockMapService } from '../../../map/shared/mock-map.service';
import { MockAreaService } from '../../../map/shared/mock-area.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('MapAreasComponent', () => {
  let component: MapAreasComponent;
  let fixture: ComponentFixture<MapAreasComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        SharedModule,
      ],
      declarations: [ MapAreasComponent ],
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
    fixture = TestBed.createComponent(MapAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
