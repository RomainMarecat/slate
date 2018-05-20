import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamStyle1Component } from './team-style1.component';

describe('TeamStyle1Component', () => {
  let component: TeamStyle1Component;
  let fixture: ComponentFixture<TeamStyle1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamStyle1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
