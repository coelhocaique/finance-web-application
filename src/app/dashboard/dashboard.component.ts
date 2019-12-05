import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';
import { DashboardModel } from 'app/_models/dashboard';
import { Debt, Income } from 'app/_models';
import * as CanvasJS from 'app/_lib/canvasjs.min';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  model: DashboardModel

  @Input() loaded = false

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

  buildDashboard() {
    this.loaded = false
    var fromDate = this.search.dateFrom
    var toDate = this.search.dateTo
    var months = this.getDiffInMonths(fromDate, toDate) + 1
    this.dashboardService.getDashboard(fromDate, toDate)
      .then(data => {
        this.loaded = true;
        setTimeout(() => {
          this.model = this.dashboardService.buildModel(data[0] as Debt[],
            data[1] as Income[],
            months)  
          
          if(this.isNotEmpty(this.model.debts.byTag)){ 
            this.initPieChart('debtByTag', 'Debts by Tag', this.model.debts.byTag)
          }

          if(this.isNotEmpty(this.model.debts.byType)){
            this.initPieChart('debtByType', 'Debts by Type', this.model.debts.byType)
          }
          
          if(this.isNotEmpty(this.model.debts.byMonth)){
            this.initPieChart('debtByMonth', 'Debts by Month', this.model.debts.byMonth)
          }
            
          if(this.isNotEmpty(this.model.incomes.netByMonth)){
            this.initPieChart('incomeNetByMonth', 'Net Income by Month', this.model.incomes.netByMonth)
          }

          if(this.isNotEmpty(this.model.incomes.dicountByName)){
            this.initPieChart('incomeDiscountByName', 'Income Discount by Name', this.model.incomes.dicountByName)
          }

          if(this.isNotEmpty(this.model.incomes.netBySourceName)){
            this.initPieChart('incomeBySourceName', 'Net Income by Source Name', this.model.incomes.netBySourceName)
          }
          
        })
      })
  }

  private isNotEmpty(d){
    return Object.keys(d).length > 0
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
