import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptinNewsletter2Component } from './optin-newsletter2.component';

describe('OptinNewsletter2Component', () => {
  let component: OptinNewsletter2Component;
  let fixture: ComponentFixture<OptinNewsletter2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptinNewsletter2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptinNewsletter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
