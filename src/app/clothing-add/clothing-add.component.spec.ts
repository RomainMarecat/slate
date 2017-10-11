import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingAddComponent } from './clothing-add.component';

describe('ClothingAddComponent', () => {
  let component: ClothingAddComponent;
  let fixture: ComponentFixture<ClothingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
