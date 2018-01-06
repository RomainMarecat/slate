import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsDetailComponent } from './cms-detail.component';

describe('CmsDetailComponent', () => {
  let component: CmsDetailComponent;
  let fixture: ComponentFixture<CmsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
