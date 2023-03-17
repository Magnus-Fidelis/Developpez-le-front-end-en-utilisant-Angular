import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { ChartData } from 'chart.js';
import { Participation } from 'src/app/core/models/Participation';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Array<Olympic> | null> = of(null);
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective | undefined;
  barChartData: {
    data: Array<Number>;
  } = {
    data: [],
  };

  barChartOptions: {
    parsing: {
      key: string;
    };
  } = {
    parsing: {
      key: 'nested.participations',
    },
  };

  data: ChartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Medaille',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  constructor(private olympicService: OlympicService) {}
  sub!: Subscription;
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.sub = this.olympics$.subscribe((data: Array<Olympic> | null) => {
      if (data) {
        this.data.labels = [];
        this.data.datasets[0].data = [];

        for (let i = 0; i < data.length; i++) {
          const element: Olympic = data[i];

          this.data.labels?.push(element.country);
          this.data.datasets[0].data.push(this.totalMedal(element));
        }
        this.chart?.chart?.update();
      }
    });
  }

  totalMedal(country: Olympic): number {
    let totalMedal = 0;
    country.participations?.forEach((p: Participation) => {
      if (p.medalsCount) totalMedal += p.medalsCount;
    });
    return totalMedal;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
