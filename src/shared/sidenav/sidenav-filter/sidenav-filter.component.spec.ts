import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavFilterComponent } from './sidenav-filter.component';

describe('SidenavFilterComponent', () => {
  let component: SidenavFilterComponent;
  let fixture: ComponentFixture<SidenavFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
