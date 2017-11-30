import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsDetailListComponent } from './cms-detail-list.component';

describe('CmsDetailListComponent', () => {
  let component: CmsDetailListComponent;
  let fixture: ComponentFixture<CmsDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsDetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
