import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';
import { DashboardModel } from 'app/_models/dashboard';
import { Debt, Income, Parameter } from 'app/_models';
import * as CanvasJS from 'app/_lib/canvasjs.min';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  model: DashboardModel

  @Input() charts = {
    debtByType: true,
    debtByTag: true,
    debtByMonth: true,
    incomeNetByMonth: true,
    incomeDiscountByName: true,
    incomeBySourceName: true,
    debtThresholdByMonth: true
  }

  @Input() loaded = false

  @Input()
  search = {
    dateFrom: new Date(),
    dateTo: new Date()
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.buildDashboard()
  }

  buildDashboard() {
    this.loaded = false
    var fromDate = this.search.dateFrom
    var toDate = this.search.dateTo
    var months = this.getDiffInMonths(fromDate, toDate) + 1
    this.dashboardService.getDashboard(fromDate, toDate)
      .then(data => {
        this.loaded = true;
        setTimeout(() => {
          this.model = this.dashboardService.buildModel(
            data[0] as Debt[],
            data[1] as Income[],
            data[2] as Parameter[],
            months)  
          
          this.buildChartDict()
          
          if(this.charts.debtByTag){ 
            this.initPieChart('debtByTag', 'Debts by Tag', this.model.debts.byTag)
          }

          if(this.charts.debtByType){
            this.initPieChart('debtByType', 'Debts by Type', this.model.debts.byType)
          }
          
          if(this.charts.debtByMonth){
            this.initPieChart('debtByMonth', 'Debts by Month', this.model.debts.byMonth)
          }

          if(this.charts.debtThresholdByMonth){
            this.initPieChart('debtThresholdByMonth', 'Debts Threshold Difference by Month', this.model.debts.thresholdDiff)
          }
            
          if(this.charts.incomeNetByMonth){
            this.initPieChart('incomeNetByMonth', 'Net Income by Month', this.model.incomes.netByMonth)
          }

          if(this.charts.incomeDiscountByName){
            this.initPieChart('incomeDiscountByName', 'Income Discount by Name', this.model.incomes.dicountByName)
          }

          if(this.charts.incomeBySourceName){
            this.initPieChart('incomeBySourceName', 'Net Income by Source Name', this.model.incomes.netBySourceName)
          }     
        })
      })
  }

  private buildChartDict(){
    this.charts = {
      debtByType: this.isNotEmpty(this.model.debts.byType),
      debtByTag: this.isNotEmpty(this.model.debts.byTag),
      debtByMonth: this.isNotEmpty(this.model.debts.byMonth),
      debtThresholdByMonth: this.isNotEmpty(this.model.debts.thresholdDiff),
      incomeNetByMonth: this.isNotEmpty(this.model.incomes.netByMonth),
      incomeDiscountByName: this.isNotEmpty(this.model.incomes.dicountByName),
      incomeBySourceName: this.isNotEmpty(this.model.incomes.netBySourceName)
    }
  }
  

  private isNotEmpty(d){
    return d != null && Object.keys(d).length > 0
  }

  private getDiffInMonths(date1: Date, date2: Date) {
    return moment(date2).diff(moment(date1), 'months', false)
  }

  private initPieChart(name: string, text: string, data) {
    let chart = new CanvasJS.Chart(name, {
      theme: "light2",
      animationEnabled: true,
      title: {
        text: text
      },
      data: [{
        type: "pie",
        showInLegend: false,
        toolTipContent: "<b>{name}</b>: R${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: data
      }]
    });

    chart.render()
  }
}
