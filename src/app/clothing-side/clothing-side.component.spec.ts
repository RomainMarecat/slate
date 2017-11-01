import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingSideComponent } from './clothing-side.component';

describe('ClothingSideComponent', () => {
  let component: ClothingSideComponent;
  let fixture: ComponentFixture<ClothingSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothingSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
