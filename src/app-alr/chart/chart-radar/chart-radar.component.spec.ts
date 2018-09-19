import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRadarComponent } from './chart-radar.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'shared/shared.module';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

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
