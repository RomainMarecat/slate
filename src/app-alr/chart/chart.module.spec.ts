import { ChartModule } from './chart.module';

describe('ChartModule', () => {
  let chartModule: ChartModule;

  beforeEach(() => {
    chartModule = new ChartModule();
  });

  it('should create an instance', () => {
    expect(chartModule).toBeTruthy();
  });
});
