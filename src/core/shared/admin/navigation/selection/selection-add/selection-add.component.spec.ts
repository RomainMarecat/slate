import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionAddComponent } from './selection-add.component';

describe('SelectionAddComponent', () => {
  let component: SelectionAddComponent;
  let fixture: ComponentFixture<SelectionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
