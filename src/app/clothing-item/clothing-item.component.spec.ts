import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingItemComponent } from './clothing-item.component';

describe('ClothingItemComponent', () => {
  let component: ClothingItemComponent;
  let fixture: ComponentFixture<ClothingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
