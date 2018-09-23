import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieComponent } from './chart-pie.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'shared/shared.module';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('ChartPieComponent', () => {
  let component: ChartPieComponent;
  let fixture: ComponentFixture<ChartPieComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
        SharedModule,
      ],
      declarations: [ ChartPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
