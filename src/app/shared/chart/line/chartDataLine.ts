import { ChartDataset, Point } from 'chart.js';
import { ChartData } from 'chart.js';

export class ChartDataLine implements ChartData<'line'> {
  labels: string[];
  datasets: ChartDataset<'line', (number | Point | null)[]>[];

  constructor() {
    this.labels = [];
    this.datasets = [
      {
        data: [],
        backgroundColor: [],
      },
    ];
  }
}
