import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientListComponent } from './ingredient-list.component';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('IngredientListComponent', () => {
  let component: IngredientListComponent;
  let fixture: ComponentFixture<IngredientListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
