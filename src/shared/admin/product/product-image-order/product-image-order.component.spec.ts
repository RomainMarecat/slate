import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageOrderComponent } from './product-image-order.component';

describe('ProductImageOrderComponent', () => {
  let component: ProductImageOrderComponent;
  let fixture: ComponentFixture<ProductImageOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImageOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
