import { GprdModule } from './gprd.module';

describe('GprdModule', () => {
  let gprdModule: GprdModule;

  beforeEach(() => {
    gprdModule = new GprdModule();
  });

  it('should create an instance', () => {
    expect(gprdModule).toBeTruthy();
  });
});
