import { LayoutBuilderModule } from './layout-builder.module';

describe('LayoutBuilderModule', () => {
  let layoutBuilderModule: LayoutBuilderModule;

  beforeEach(() => {
    layoutBuilderModule = new LayoutBuilderModule();
  });

  it('should create an instance', () => {
    expect(layoutBuilderModule).toBeTruthy();
  });
});
