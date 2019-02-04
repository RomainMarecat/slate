import { TestBed } from '@angular/core/testing';

import { RecipeService } from './recipe.service';
import { MockRecipeService } from './mock-recipe.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ],
    providers: [
      {provide: RecipeService, useClass: MockRecipeService}
    ]
  }));

  it('should be created', () => {
    const service: RecipeService = TestBed.get(RecipeService);
    expect(service).toBeTruthy();
  });
});
