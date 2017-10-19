import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingPreviewComponent } from './clothing-preview.component';

describe('ClothingPreviewComponent', () => {
  let component: ClothingPreviewComponent;
  let fixture: ComponentFixture<ClothingPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothingPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
