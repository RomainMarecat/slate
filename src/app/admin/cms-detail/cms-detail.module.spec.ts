import { CmsDetailModule } from './cms-detail.module';

describe('CmsDetailModule', () => {
  let cmsDetailModule: CmsDetailModule;

  beforeEach(() => {
    cmsDetailModule = new CmsDetailModule();
  });

  it('should create an instance', () => {
    expect(cmsDetailModule).toBeTruthy();
  });
});
