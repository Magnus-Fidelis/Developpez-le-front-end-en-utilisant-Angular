import { ChartOptions } from 'chart.js';

export class ChartDataLineOptions implements ChartOptions<'line'> {
  responsive = true;
  plugins = {
    legend: {
      display: false,
    },
  };
}
