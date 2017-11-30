import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsDetailAddComponent } from './cms-detail-add.component';

describe('CmsDetailAddComponent', () => {
  let component: CmsDetailAddComponent;
  let fixture: ComponentFixture<CmsDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsDetailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
