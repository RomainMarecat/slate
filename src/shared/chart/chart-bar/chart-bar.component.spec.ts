import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarComponent } from './chart-bar.component';
import { ChartsModule } from 'ng2-charts';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { SharedModule } from '../../shared.module';

describe('ChartBarComponent', () => {
  let component: ChartBarComponent;
  let fixture: ComponentFixture<ChartBarComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
        SharedModule,
      ],
      declarations: [ChartBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
