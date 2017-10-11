import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingImageComponent } from './clothing-image.component';

describe('ClothingImageComponent', () => {
  let component: ClothingImageComponent;
  let fixture: ComponentFixture<ClothingImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothingImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
