import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_FINANCE_SERVICE } from 'app/_helpers/constants'

@Injectable()
export class IncomeService {

  private baseUrl = URL_FINANCE_SERVICE + '/v1/income'

  constructor(private http: HttpClient) { }

  getIncomes(year: number, month: string) {
    if (month == null || month <= '0') {
      return this.getByRange(year)
    }

    const reference_date = year.toString() + month.toString().padStart(2, '0')
    return this.executeGet('reference_date=' + reference_date)
  }

  private getByRange(year: number) {
    const dateFrom = year.toString() + "01"
    const dateTo = year.toString() + "12"
    return this.findByRange(dateFrom, dateTo)
  }

  findByRange(fromDate: string, toDate: string) {
    return this.executeGet('date_from=' + fromDate + '&date_to=' + toDate)
  }

  create(income: Object) {
    return this.http.post(this.baseUrl,
      JSON.stringify(income),
      { observe: 'response' })
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + '/' + id,
      { observe: 'response' })
  }

  private executeGet(params: string) {
    return this.http.get(this.baseUrl + '?' + params)
  }
}
