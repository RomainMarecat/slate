import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { AreaComponent } from '../area/area.component';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { MockMapService } from '../shared/mock-map.service';
import { MapService } from '../shared/map.service';
import { MockAreaService } from '../shared/mock-area.service';
import { AreaService } from '../shared/area.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AreaListComponent } from '../area-list/area-list.component';
import { AreaDrawComponent } from '../area-draw/area-draw.component';
import { MatListModule } from '@angular/material';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgArrayPipesModule } from 'ngx-pipes';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { SeoModule } from '../../seo/seo.module';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        MatListModule,
        NgArrayPipesModule,
        SeoModule,
        RouterTestingModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        MapComponent,
        AreaComponent,
        AreaListComponent,
        AreaDrawComponent
      ],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: MapService, useClass: MockMapService},
        {provide: AreaService, useClass: MockAreaService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
