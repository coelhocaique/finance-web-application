import { Injectable } from '@angular/core';
import { DebtsService } from './debts.service';
import { IncomeService } from './income.service';
import { Debt, DashboardModel, Income, Parameter } from 'app/_models';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { URL_GATEWAY } from 'app/_helpers/constants'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboard(dateFrom: Date, dateTo: Date) {

    let fromDate = moment(dateFrom).format('YYYYMM').toString()
    let toDate = moment(dateTo).format('YYYYMM').toString()

    return this.http.get(URL_GATEWAY + '/dashboard?date_from=' + fromDate + '&date_to=' + toDate)
  }
}
