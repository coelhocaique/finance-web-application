import { Injectable } from '@angular/core';
import { DebtsService } from './debts.service';
import { IncomeService } from './income.service';
import { Debt, DashboardModel, Income } from 'app/_models';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MONTH_NAMES } from 'app/_helpers/constants'

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
    ).toPromise()
  }

  buildModel(debts: Debt[], incomes: Income[], months: number) {
    let model = { debts: this.debts(debts, months), 
                  incomes: this.incomes(incomes, months) } as DashboardModel

    model.profits = this.profits(model, months)
    return model          
  }

  private debts(debts: Debt[], len: number) {
    if (debts.length == 0){
      return {total: 0, mean: 0}
    }

    let totalAmount = debts.reduce((summ, v) => summ += v.amount, 0)
    let meanAmount = totalAmount / len
    let byType = {}
    let byTag = {}
    let byMonth = {}

    debts.forEach(debt => {
      if(byTag[debt.tag] != null){
        byTag[debt.tag] = byTag[debt.tag] + debt.amount
      }else{
        byTag[debt.tag] = debt.amount
      }

      if(byType[debt.type] != null){
        byType[debt.type] = byType[debt.type] + debt.amount
      }else{
        byType[debt.type] = debt.amount
      }

      if(byMonth[debt.reference_date] != null){
        byMonth[debt.reference_date] = byMonth[debt.reference_date] + debt.amount
      }else{
        byMonth[debt.reference_date] = debt.amount
      }
    })
    return { total: totalAmount, 
            mean: meanAmount, 
            byTag: this.getAsList(byTag), 
            byType: this.getAsList(byType),
            byMonth: this.getAsListMonth(byMonth)}
  }

  private incomes(incomes: Income[], len: number) {
    if (incomes.length == 0){
      return { netTotal: 0, netMean: 0, grossTotal: 0, grossMean: 0}
    }

    let netTotal = incomes.reduce((summ, v) => summ += v.net_amount, 0)
    let grossTotal = incomes.reduce((summ, v) => summ += v.gross_amount, 0)
    let meanNet = netTotal / len
    let meanGross = grossTotal / len
    let netByMonth = {}
    let dicountByName = {}
    let netBySourceName = {}
    
    incomes.forEach(income => {
      income.discounts.forEach(discount => {
        var desc = discount.description.trim()
        if(dicountByName[desc] != null){
          dicountByName[desc] = dicountByName[desc] + discount.amount
        }else{
          dicountByName[desc] = discount.amount
        }
      })

      if(netByMonth[income.reference_date] != null){
        netByMonth[income.reference_date] = netByMonth[income.reference_date] + income.net_amount
      }else{
        netByMonth[income.reference_date] = income.net_amount
      }
      
      if(netBySourceName[income.source_name] != null){
        netBySourceName[income.source_name] = netBySourceName[income.source_name] + income.net_amount
      }else{
        netBySourceName[income.source_name] = income.net_amount
      }
    })
    return { netTotal: netTotal, 
            netMean: meanNet, 
            grossTotal: grossTotal, 
            grossMean: meanGross,
            netByMonth : this.getAsListMonth(netByMonth),
            dicountByName : dicountByName,
            netBySourceName : this.getAsList(netBySourceName)}
  }

  private profits(model: DashboardModel, len: number) {
    let debts = model.debts
    let incomes = model.incomes
    let total = incomes.netTotal - debts.total
    let mean = total / len
    return { total: total, mean: mean}
  }

  private getAsListMonth(dict: {}){
    let l = []
     Object.keys(dict).forEach(function(key) {
      let k = parseInt(key.toString().substring(4, 6))
      let m = key.toString().substring(2, 4)
      l.push({ y: dict[key], name: MONTH_NAMES[k - 1] + "/" + m })
     })

     return l
  }

  private getAsList(dict: {}) {
    let l = []
    Object.keys(dict).forEach(function(key) {
      l.push({ y: dict[key], name: key })
     })

     return l
  }
}
