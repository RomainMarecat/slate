import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticStyle1Component } from './statistic-style1.component';

describe('StatisticStyle1Component', () => {
  let component: StatisticStyle1Component;
  let fixture: ComponentFixture<StatisticStyle1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticStyle1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
