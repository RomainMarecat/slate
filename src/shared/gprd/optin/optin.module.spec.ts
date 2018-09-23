import { OptinModule } from './optin.module';

describe('OptinModule', () => {
  let optinModule: OptinModule;

  beforeEach(() => {
    optinModule = new OptinModule();
  });

  it('should create an instance', () => {
    expect(optinModule).toBeTruthy();
  });
});
