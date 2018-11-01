import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationDetailComponent } from './preparation-detail.component';

describe('PreparationDetailComponent', () => {
  let component: PreparationDetailComponent;
  let fixture: ComponentFixture<PreparationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreparationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
