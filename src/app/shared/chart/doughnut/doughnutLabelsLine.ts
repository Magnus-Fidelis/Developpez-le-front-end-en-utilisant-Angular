import { Chart } from 'chart.js';

export class doughnutLabelsLine {
  verySmallMobile = false;
  id = 'doughnutLabelsLine';
  afterDraw(chart: Chart) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
    } = chart;

    chart.data.datasets.forEach((dataset, i) => {
      chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
        const { x, y } = datapoint.tooltipPosition(true);
        let halfwidth = width / 1.8;
        let xLine = x >= halfwidth ? x * 1.34 : x * 0.56;
        let textXLine = x >= halfwidth ? x * 1.35 : x * 0.42;
        ctx.font = '20px Arial';
        // tablet
        if (width < 800) {
          halfwidth = width / 1.3;
          ctx.font = '14px Arial';
          xLine = x >= halfwidth ? x * 1.35 : x * 0.2;
          textXLine = x >= halfwidth ? x * 1.4 : x * 0.1;
        }
        //mobile and very small mobile
        if (width < 300) {
          halfwidth = width < 200 ? width / 1 : width / 1.4;
          ctx.font = width < 200 ? '8px Arial' : '14px Arial';

          xLine = x >= halfwidth ? x * 1.35 : x * 0.5;
          textXLine = x >= halfwidth ? x * 1.4 : x * 0.1;
        }

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xLine, y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = (dataset.backgroundColor as Array<string>)[index];
        ctx.stroke();

        if (chart.data.labels) {
          ctx.fillText(chart.data.labels[index] as string, textXLine, y + 3);
        }
      });
    });
  }
}
