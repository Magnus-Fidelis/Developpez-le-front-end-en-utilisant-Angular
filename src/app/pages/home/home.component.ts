import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
import { doughnutLabelsLine } from 'src/app/shared/chart/doughnut/doughnutLabelsLine';
import { ChartDataDoughnut } from 'src/app/shared/chart/doughnut/chartDataDoughnut';
import { ChartDataDoughnutOptions } from 'src/app/shared/chart/doughnut/chartDataDoughnutOptions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pieChartPlugins = [DatalabelsPlugin];
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective | undefined;

  image = new Image(20, 20);
  doughnutLabelsLine = new doughnutLabelsLine();
  public doughnutLabelsLinePlugins = [this.doughnutLabelsLine];

  options = new ChartDataDoughnutOptions(this.router);

  chartDataDoughnut = new ChartDataDoughnut();
  sub!: Subscription;
  JO: number = 0;
  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.doughnutDesign();

    this.sub = this.olympicService
      .getOlympics()
      .subscribe((data: Array<Olympic> | null) => {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            const element: Olympic = data[i];
            if (element.country)
              this.chartDataDoughnut.labels?.push(element.country);
            this.chartDataDoughnut.datasets[0].data.push(
              this.olympicService.totalMedal(element)
            );
            if (
              data[i].participations &&
              data[i].participations!.length > this.JO
            ) {
              this.JO = data[i].participations!.length;
            }
          }
          this.chart?.chart?.update();
        }
      });
  }

  doughnutDesign() {
    this.options.plugins.tooltip.usePointStyle = true;
    this.options.plugins.tooltip.padding = 15;
    this.options.plugins.tooltip.titleFont = {
      size: 18,
    };
    this.options.plugins.tooltip.bodyFont = {
      size: 14,
    };
    this.options.plugins.tooltip.backgroundColor = '#04838f';
    this.options.plugins.tooltip.callbacks = {
      labelPointStyle: (context: any) => {
        this.image.src = '../../../assets/iconmonstr-award-6.svg';
        return {
          rotation: 0,
          pointStyle: this.image,
        };
      },
    };

    this.options.responsive = true;
    this.chartDataDoughnut.datasets[0].backgroundColor = [
      '#793d52',
      '#89a1db',
      '#9780a1',
      '#bfe0f1',
      '#bd7c82',
    ];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
