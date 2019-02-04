import { TestBed } from '@angular/core/testing';

import { IngredientService } from './ingredient.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockIngredientService } from './mock-ingredient.service';

describe('IngredientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ],
    providers: [
      {provide: IngredientService, useClass: MockIngredientService}
    ]
  }));

  it('should be created', () => {
    const service: IngredientService = TestBed.get(IngredientService);
    expect(service).toBeTruthy();
  });
});
