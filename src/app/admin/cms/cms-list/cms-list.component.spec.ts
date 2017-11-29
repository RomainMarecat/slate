import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsListComponent } from './cms-list.component';

describe('CmsListComponent', () => {
  let component: CmsListComponent;
  let fixture: ComponentFixture<CmsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
