import { ChartDataset } from 'chart.js';
import { ChartData } from 'chart.js';

export class ChartDataDoughnut implements ChartData<'doughnut'> {
  labels: string[];
  datasets: ChartDataset<'doughnut', number[]>[];

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
