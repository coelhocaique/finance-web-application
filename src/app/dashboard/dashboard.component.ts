import { Component, OnInit, Input } from '@angular/core';
import * as Chartist from 'chartist';
import { DashboardService } from 'app/services/dashboard.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';

export interface DashboardResponse {
  debts: {
    total: number,
    mean: number,
    chartItems: [
      {
        yaxis: string,
        xaxis: string
      }
    ]
  },
  incomes: {
    netTotal: number,
    netMean: number,
    grossTotal: number,
    grossMean: number,
    chartItems: [
      {
        yaxis: string,
        xaxis: string
      }
    ]
  },
  profits: {
    total: number,
    mean: number,
    chartItems: [
      {
        yaxis: string,
        xaxis: string
      }
    ]
  },
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  response: DashboardResponse

  @Input()
  search = {
    dateFrom: new Date(),
    dateTo: new Date()
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.initParams()
    this.buildDashboard()
  }

  initParams() {
    this.search.dateFrom = new Date(this.search.dateFrom.getFullYear(), 0, 1);
    var d = new Date();
    d.setMonth(d.getMonth() - 1);
    this.search.dateTo = d;
  }

  buildDashboard(){
    this.dashboardService.getDashboard(this.search.dateFrom, this.search.dateTo)
      .subscribe(data => {
      this.response = data as DashboardResponse
        let labelsDebt: string[] = []
        let seriesDebt: string[] = []

        this.response.debts.chartItems.forEach((item) => {
          labelsDebt.push(item.xaxis)
          seriesDebt.push(item.yaxis)
        })

        const dataCompletedTasksChart: any = {
          labels: labelsDebt,
          series: [seriesDebt]
        };

        const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: -10 + Math.min.apply(Math, this.response.debts.chartItems.map(function (o) { return o.yaxis; })),
          high: 10 + Math.max.apply(Math, this.response.debts.chartItems.map(function (o) { return o.yaxis; })),
          height: 250,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        this.startAnimationForLineChart(completedTasksChart);

        let labelsIncome: string[] = []
        let seriesIncome: number[] = []

        this.response.incomes.chartItems.forEach((item) => {
          labelsIncome.push(item.xaxis)
          seriesIncome.push(+item.yaxis)
        })

        var datawebsiteViewsChart = {
          labels: labelsIncome,
          series: [seriesIncome]
        };
        var optionswebsiteViewsChart = {
          axisX: {
            showGrid: false
          },
          low: -10 + Math.min.apply(Math, this.response.incomes.chartItems.map(function (o) { return o.yaxis; })),
          high: 10 + Math.max.apply(Math, this.response.incomes.chartItems.map(function (o) { return o.yaxis; })),
          height: 250,
          chartPadding: { top: 0, right: 2, bottom: 0, left: 0 }
        };
        var responsiveOptions: any[] = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];
        var websiteViewsChart = new Chartist.Line('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

        this.startAnimationForLineChart(websiteViewsChart);

        let labelsProfit: string[] = []
        let seriesProfit: number[] = []

        this.response.profits.chartItems.forEach((item) => {
          labelsProfit.push(item.xaxis)
          seriesProfit.push(+item.yaxis)
        })

        const dataDailySalesChart: any = {
          labels: labelsProfit,
          series: [seriesProfit]
        };

        const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: -10 + Math.min.apply(Math, this.response.profits.chartItems.map(function (o) { return o.yaxis; })),
          high: 10 + Math.max.apply(Math, this.response.profits.chartItems.map(function (o) { return o.yaxis; })),
          height: 250,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        this.startAnimationForLineChart(dailySalesChart);
      });
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }
}
