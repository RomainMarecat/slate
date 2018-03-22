import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapListComponent } from './map-list.component';
import { SharedModule } from '../../../shared.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AreaService } from '../../../map/shared/area.service';
import { MapService } from '../../../map/shared/map.service';
import { MockAreaService } from '../../../map/shared/mock-area.service';
import { MockMapService } from '../../../map/shared/mock-map.service';
import { MapEditComponent } from '../map-edit/map-edit.component';
import { MapAreasComponent } from '../map-areas/map-areas.component';
import { MenuService } from '../../../menu/menu.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { AlertService } from '../../../popup/alert.service';

describe('MapListComponent', () => {
  let component: MapListComponent;
  let fixture: ComponentFixture<MapListComponent>;

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
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        SharedModule,
      ],
      declarations: [ MapListComponent, MapEditComponent, MapAreasComponent ],
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
    fixture = TestBed.createComponent(MapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
