import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import moment = require('moment');
import { DebtsService } from './debts.service';
import { IncomeService } from './income.service';
import { Debt, DashboardModel, Chart, Income } from 'app/_models';
import { max } from 'rxjs/operators';

@Injectable()
export class DashboardService {

  private baseUrl = 'http://127.0.0.1:8888/v1/dashboard'

  private debtsModel = {}
  private incomesModel = {}

  constructor(private debtService: DebtsService, private incomeService: IncomeService) { }

  getDashboard(dateFrom: Date, dateTo: Date){

    let fromDate = moment(dateFrom.toString()).format('YYYYMM').toString()
    let toDate = moment(dateTo.toString()).format('YYYYMM').toString()
    this.debtService.findByRange(fromDate, toDate)
              .subscribe(data => {
                console.log(data) 
                this.debtsModel = this.debts(data as Debt[])})

    this.incomeService.findByRange(fromDate, toDate)
              .subscribe(data => {
                console.log(data) 
                this.incomesModel = this.incomes(data)})

    var model = {debts: this.debtsModel, incomes: this.incomesModel} as DashboardModel
    model.profits = this.profits(model)

    return model
  }


  debts(debts: Debt[]) {
    let totalAmount = debts.reduce((summ, v) => summ += v.amount, 0)
    let meanAmount = totalAmount / debts.length
    let items = []

    debts.forEach (d => { 
      items.push(this.buildChart(d.reference_date, d.amount.toString()))
    })

    return {total: totalAmount, mean: meanAmount, chartItems: items} 
  }

  incomes(incomes: Income[]) {
    let netTotal = incomes.reduce((summ, v) => summ += v.net_amount, 0)
    let grossTotal = incomes.reduce((summ, v) => summ += v.gross_amount, 0)
    let meanNet = netTotal / incomes.length
    let meanGross = grossTotal / incomes.length
    let items = []

    incomes.forEach (d => { 
      items.push(this.buildChart(d.reference_date, d.net_amount.toString()))
    })

    return {netTotal: netTotal, netMean: meanNet, grossTotal: grossTotal, grossMean: meanGross, chartItems: items} 
  }

  profits(model: DashboardModel) {
    console.log("model")
    console.log(model)
    let debts = model.debts
    let incomes = model.incomes
    let total = incomes.netTotal - debts.total
    let dchart = debts.chartItems
    let ichart = incomes.chartItems         

    let mean = total / Math.max(dchart.length, ichart.length)
    let items = []
    let ddict = {}


    // dchart.forEach (d => { 
    //   let date = d.xaxys
    //   let value = parseInt(d.yaxis)

      
    //   items.push(this.buildChart(d.reference_date, d.net_amount.toString()))
    // })

    return {total: total, mean: mean, chartItems: items} 
  }

  private buildChart(x: string, y: string){
    return {xaxis: x, yaxis: y} as Chart
  }
}
