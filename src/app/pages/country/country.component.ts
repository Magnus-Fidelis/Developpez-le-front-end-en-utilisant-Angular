import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, Subscription, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartDataLine } from 'src/app/shared/chart/line/chartDataLine';
import { ChartDataLineOptions } from 'src/app/shared/chart/line/chartDataLineOptions';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent {
  country: string | undefined;
  selectedCountry: Olympic | null = null;
  medals: number = 0;
  athletes: number | undefined = 0;

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective | undefined;
  public olympics$: Observable<Array<Olympic> | null> = of(null);

  options = new ChartDataLineOptions();
  chartDataLine = new ChartDataLine();
  sub!: Subscription;
  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.sub = this.olympics$.subscribe((data: Array<Olympic> | null) => {
      if (data) {
        this.selectedCountry = data.filter((d: Olympic) => {
          if ('/' + d?.country == decodeURI(this.router.url)) {
            return d;
          }
          return null;
        })[0];
        this.medals = this.olympicService.totalMedal(this.selectedCountry);
        if (this.selectedCountry.participations)
          this.athletes =
            this.selectedCountry.participations[
              this.selectedCountry.participations.length - 1
            ].athleteCount;

        this.selectedCountry.participations?.forEach((p: Participation) => {
          if (p.year && p.medalsCount) {
            this.chartDataLine.labels?.push(p.year.toString());
            this.chartDataLine.datasets[0].data.push(p.medalsCount);
          }
          this.chart?.chart?.update();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
