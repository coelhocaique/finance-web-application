import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_GATEWAY } from 'app/_helpers/constants'

@Injectable()
export class DebtsService {

  constructor(private http: HttpClient) { }

  getDebts(year: number, month: number) {
    if (month == null || month <= 0) {
      return this.getByRange(year)
    }
    let reference_date = year.toString() + month.toString().padStart(2, '0')
    return this.executeGet(URL_GATEWAY + '/debt', 'reference_date=' + reference_date)
  }

  private getByRange(year: number) {
    let dateFrom = year.toString() + "01"
    let dateTo = year.toString() + "12"
    return this.findByRange(dateFrom, dateTo)
  }

  findByRange(fromDate: string, toDate: string) {
    return this.executeGet(URL_GATEWAY + '/debt', 'date_from=' + fromDate + '&date_to=' + toDate)
  }

  retrieveCreation() {
    return this.executeGet(URL_GATEWAY + '/debt-new', '')
  }

  create(debt: Object) {
    return this.http.post(URL_GATEWAY + '/debt',
      JSON.stringify(debt), { observe: 'response' })
  }

  delete(referenceCode: string) {
    return this.http.delete(URL_GATEWAY + '/debt?reference_code=' + referenceCode,
      { observe: 'response' })
  }

  private executeGet(url: string, params: string) {
    return this.http.get(url + '?' + params)
  }
}
