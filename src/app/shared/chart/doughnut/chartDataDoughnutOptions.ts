import { Router } from '@angular/router';
import { ActiveElement, Chart, ChartEvent, ChartOptions } from 'chart.js';

export class ChartDataDoughnutOptions implements ChartOptions<'doughnut'> {
  responsive = false;
  layout = {
    padding: 0,
  };
  plugins = {
    tooltip: {
      usePointStyle: false,
      padding: 0,
      titleFont: {
        size: 0,
      },
      bodyFont: {
        size: 0,
      },
      backgroundColor: '',
      callbacks: {},
    },
    legend: {
      display: false,
    },
  };
  onResize = (chart: Chart) => {
    if (window.innerWidth < 1200 && window.innerWidth > 700) {
      chart.options.layout!.padding = 150;
    } else {
      chart.options.layout!.padding = 70;
    }
  };
  onClick = (events: ChartEvent, elements: ActiveElement[], chart: Chart) => {
    this.router.navigate([chart.tooltip?.title[0]]);
    return chart;
  };
  constructor(private router: Router) {}
}
