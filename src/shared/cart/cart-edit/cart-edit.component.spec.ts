import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartEditComponent } from './cart-edit.component';

describe('CartEditComponent', () => {
  let component: CartEditComponent;
  let fixture: ComponentFixture<CartEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
