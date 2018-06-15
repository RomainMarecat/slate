import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDynamicComponent } from './chart-dynamic.component';

describe('ChartDynamicComponent', () => {
  let component: ChartDynamicComponent;
  let fixture: ComponentFixture<ChartDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
