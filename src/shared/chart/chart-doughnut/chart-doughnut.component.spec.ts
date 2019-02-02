import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDoughnutComponent } from './chart-doughnut.component';
import { ChartsModule } from 'ng2-charts';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { SharedModule } from '../../shared.module';

describe('ChartDoughnutComponent', () => {
  let component: ChartDoughnutComponent;
  let fixture: ComponentFixture<ChartDoughnutComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
        SharedModule,
      ],
      declarations: [ ChartDoughnutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
