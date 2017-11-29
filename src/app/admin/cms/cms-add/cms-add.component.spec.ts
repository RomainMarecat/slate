import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsAddComponent } from './cms-add.component';

describe('CmsAddComponent', () => {
  let component: CmsAddComponent;
  let fixture: ComponentFixture<CmsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
