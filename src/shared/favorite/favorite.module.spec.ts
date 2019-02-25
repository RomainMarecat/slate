import { FavoriteModule } from './favorite.module';

describe('FavoriteModule', () => {
  let favoriteModule: FavoriteModule;

  beforeEach(() => {
    favoriteModule = new FavoriteModule();
  });

  it('should create an instance', () => {
    expect(favoriteModule).toBeTruthy();
  });
});
