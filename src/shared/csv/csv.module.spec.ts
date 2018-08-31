import { CsvModule } from './csv.module';

describe('CsvModule', () => {
  let csvModule: CsvModule;

  beforeEach(() => {
    csvModule = new CsvModule();
  });

  it('should create an instance', () => {
    expect(csvModule).toBeTruthy();
  });
});
