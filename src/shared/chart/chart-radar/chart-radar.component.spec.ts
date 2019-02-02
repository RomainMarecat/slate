import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRadarComponent } from './chart-radar.component';
import { ChartsModule } from 'ng2-charts';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { SharedModule } from '../../shared.module';

describe('ChartRadarComponent', () => {
  let component: ChartRadarComponent;
  let fixture: ComponentFixture<ChartRadarComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
        SharedModule,
      ],
      declarations: [ ChartRadarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
