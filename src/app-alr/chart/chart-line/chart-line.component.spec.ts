import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLineComponent } from './chart-line.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'shared/shared.module';

describe('ChartLineComponent', () => {
  let component: ChartLineComponent;
  let fixture: ComponentFixture<ChartLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
        SharedModule,
      ],
      declarations: [ ChartLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});