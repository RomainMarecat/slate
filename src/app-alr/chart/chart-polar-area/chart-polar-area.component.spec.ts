import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPolarAreaComponent } from './chart-polar-area.component';

describe('ChartPolarAreaComponent', () => {
  let component: ChartPolarAreaComponent;
  let fixture: ComponentFixture<ChartPolarAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
