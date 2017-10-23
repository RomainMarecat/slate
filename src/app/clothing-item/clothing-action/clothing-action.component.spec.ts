import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingActionComponent } from './clothing-action.component';

describe('ClothingActionComponent', () => {
  let component: ClothingActionComponent;
  let fixture: ComponentFixture<ClothingActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothingActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
