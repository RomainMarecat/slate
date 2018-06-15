import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDoughnutComponent } from './chart-doughnut.component';

describe('ChartDoughnutComponent', () => {
  let component: ChartDoughnutComponent;
  let fixture: ComponentFixture<ChartDoughnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
