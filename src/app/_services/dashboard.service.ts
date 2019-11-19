import { Injectable } from '@angular/core';
import { DebtsService } from './debts.service';
import { IncomeService } from './income.service';
import { Debt, DashboardModel, Chart, Income } from 'app/_models';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class DashboardService {

  constructor(private debtService: DebtsService, private incomeService: IncomeService) {
  }

  getDashboard(dateFrom: Date, dateTo: Date) {

    let fromDate = moment(dateFrom.toString()).format('YYYYMM').toString()
    let toDate = moment(dateTo.toString()).format('YYYYMM').toString()

    return this.retrieveItems(fromDate, toDate)
  }

  retrieveItems(fromDate: string, toDate: string) {
    return Observable.forkJoin(
      this.debtService.findByRange(fromDate, toDate),
      this.incomeService.findByRange(fromDate, toDate)
    )
  }

  buildModel(debts: Debt[], incomes: Income[]) {
    let model = { debts: this.debts(debts), incomes: this.incomes(incomes) } as DashboardModel
    return this.profits(model)
  }

  private debts(debts: Debt[]) {
    let totalAmount = debts.reduce((summ, v) => summ += v.amount, 0)
    let meanAmount = totalAmount / debts.length
    let items = []

    debts.forEach(d => {
      items.push(this.buildChart(d.reference_date, d.amount.toString()))
    })

    return { total: totalAmount, mean: meanAmount, chartItems: items }
  }

  private incomes(incomes: Income[]) {
    let netTotal = incomes.reduce((summ, v) => summ += v.net_amount, 0)
    let grossTotal = incomes.reduce((summ, v) => summ += v.gross_amount, 0)
    let meanNet = netTotal / incomes.length
    let meanGross = grossTotal / incomes.length
    let items = []

    incomes.forEach(d => {
      items.push(this.buildChart(d.reference_date, d.net_amount.toString()))
    })

    return { netTotal: netTotal, netMean: meanNet, grossTotal: grossTotal, grossMean: meanGross, chartItems: items }
  }

  private profits(model: DashboardModel): DashboardModel {
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

    model.profits = { total: total, mean: mean, chartItems: items }
    return model
  }

  private buildChart(x: string, y: string) {
    return { xaxis: x, yaxis: y } as Chart
  }
}
