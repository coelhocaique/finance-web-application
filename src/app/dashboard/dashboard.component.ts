import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';
import { DashboardModel, DataPoints } from 'app/_models/dashboard';
import * as CanvasJS from 'app/_lib/canvasjs.min';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  model: DashboardModel

  monthsDiff: number

  @Input() charts = {
    debtByType: true,
    debtByTag: true,
    debtByMonth: true,
    incomeNetByMonth: true,
    incomeDiscountByName: true,
    incomeBySourceName: true,
    debtThresholdByMonth: true,
    debtByName: true,
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
    this.monthsDiff = this.getDiffInMonths(fromDate, toDate) + 1
    this.dashboardService.getDashboard(fromDate, toDate)
      .subscribe(data => {
        this.model = data as DashboardModel
        this.buildChartDict()
        this.loaded = true;
        setTimeout(() => {  
          if(this.charts.debtByTag){ 
            this.initPieChart('debtByTag', 'Debts by Tag', this.model.debt_by_tag)
          }

          if(this.charts.debtByType){
            this.initPieChart('debtByType', 'Debts by Type', this.model.debt_by_type)
          }
          
          if(this.charts.debtByMonth){
            this.initPieChart('debtByMonth', 'Debts by Month', this.model.debt_by_month)
          }

          if(this.charts.debtThresholdByMonth){
            this.initPieChart('debtThresholdByMonth', 'Debts Threshold Difference by Month', this.model.debt_threshold_by_month)
          }
            
          if(this.charts.incomeNetByMonth){
            this.initPieChart('incomeNetByMonth', 'Net Income by Month', this.model.income_net_by_month)
          }

          if(this.charts.incomeDiscountByName){
            this.initPieChart('incomeDiscountByName', 'Income Discount by Name', this.model.income_discount_by_name)
          }

          if(this.charts.incomeBySourceName){
            this.initPieChart('incomeBySourceName', 'Net Income by Source Name', this.model.income_net_by_source_name)
          } 
          
          if(this.charts.debtByName){
            this.initPieChart('debtByName', 'Debt by Name', this.model.debt_by_name)
          } 
        })
      })
  }

  private buildChartDict(){
    this.charts = {
      debtByType: this.isNotEmpty(this.model.debt_by_type),
      debtByTag: this.isNotEmpty(this.model.debt_by_tag),
      debtByMonth: this.isNotEmpty(this.model.debt_by_month),
      debtThresholdByMonth: this.isNotEmpty(this.model.debt_threshold_by_month),
      incomeNetByMonth: this.isNotEmpty(this.model.income_net_by_month),
      incomeDiscountByName: this.isNotEmpty(this.model.income_discount_by_name),
      incomeBySourceName: this.isNotEmpty(this.model.income_net_by_source_name),
      debtByName: this.isNotEmpty(this.model.debt_by_name)
    }
  }
  

  private isNotEmpty(d: DataPoints[]){
    return d != null && d.length > 0
  }

  private getDiffInMonths(date1: Date, date2: Date) {
    return moment(date2).diff(moment(date1), 'months', false)
  }

  private initPieChart(name: string, text: string, data: DataPoints[]) {
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
        dataPoints: this.getAsList(data)
      }]
    });
    chart.render()
  }
  
  private getAsList(data: DataPoints[]) {
    let l = []
    data.forEach(it => l.push({ y: parseInt(it.y), name: it.name }))
    return l
  }
}
