import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartListComponent } from './chart-list.component';
import { ChartsModule } from 'ng2-charts';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartBarComponent } from '../chart-bar/chart-bar.component';
import { ChartLineComponent } from '../chart-line/chart-line.component';
import { ChartPolarAreaComponent } from '../chart-polar-area/chart-polar-area.component';
import { ChartRadarComponent } from '../chart-radar/chart-radar.component';
import { ChartDoughnutComponent } from '../chart-doughnut/chart-doughnut.component';
import { ChartDynamicComponent } from '../chart-dynamic/chart-dynamic.component';
import { ChartPieComponent } from '../chart-pie/chart-pie.component';
import { SeoModule } from '../../seo/seo.module';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { SharedModule } from '../../shared.module';
import { MatCardModule } from '@angular/material/card';

describe('ChartListComponent', () => {
  let component: ChartListComponent;
  let fixture: ComponentFixture<ChartListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
        SharedModule,
        MatCardModule,
        RouterTestingModule,
        SeoModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [
        ChartListComponent,
        ChartBarComponent,
        ChartLineComponent,
        ChartPieComponent,
        ChartPolarAreaComponent,
        ChartRadarComponent,
        ChartDoughnutComponent,
        ChartDynamicComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
