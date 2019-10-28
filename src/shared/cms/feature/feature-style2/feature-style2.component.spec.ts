import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureStyle2Component } from './feature-style2.component';

describe('FeatureStyle2Component', () => {
  let component: FeatureStyle2Component;
  let fixture: ComponentFixture<FeatureStyle2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureStyle2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureStyle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
