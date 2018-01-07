import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeEditComponent } from './attribute-edit.component';

describe('AttributeEditComponent', () => {
  let component: AttributeEditComponent;
  let fixture: ComponentFixture<AttributeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
