import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPolarAreaComponent } from './chart-polar-area.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'shared/shared.module';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('ChartPolarAreaComponent', () => {
  let component: ChartPolarAreaComponent;
  let fixture: ComponentFixture<ChartPolarAreaComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
        SharedModule,
      ],
      declarations: [ ChartPolarAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPolarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
