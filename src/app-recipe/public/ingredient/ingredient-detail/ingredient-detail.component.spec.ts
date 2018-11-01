import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDetailComponent } from './ingredient-detail.component';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('IngredientDetailComponent', () => {
  let component: IngredientDetailComponent;
  let fixture: ComponentFixture<IngredientDetailComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
