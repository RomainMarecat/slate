import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionEditComponent } from './selection-edit.component';

describe('SelectionEditComponent', () => {
  let component: SelectionEditComponent;
  let fixture: ComponentFixture<SelectionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
