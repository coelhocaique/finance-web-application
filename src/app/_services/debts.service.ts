import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Debt } from 'app/_models/debt';

@Injectable()
export class DebtsService {

  private baseUrl = 'http://127.0.0.1:8081/v1'

  // private baseUrl = 'http://ec2-3-88-43-183.compute-1.amazonaws.com:8081/v1'

  public static monthNames = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  constructor(private http: HttpClient) {}

  getDebts(year: number, month: number) {
    if (month == null || month <= 0) {
      return this.getByRange(year)
    }
    let reference_date = year.toString() + month.toString().padStart(2, '0')
    return this.executeGet(this.baseUrl + '/debt', 'reference_date=' + reference_date)
  }

  private getByRange(year: number) {
    let dateFrom = year.toString() + "01"
    let dateTo = year.toString() + "12"
    return this.findByRange(dateFrom, dateTo)
  }

  findByRange(fromDate: string, toDate: string){
    return this.executeGet(this.baseUrl + '/debt', 'date_from=' + fromDate + '&date_to=' + toDate)
  }

  getTypes() {
    return this.executeGet(this.baseUrl + '/custom-attribute', 'property_name=debt_type')
  }

  getTags() {
    return this.executeGet(this.baseUrl + '/custom-attribute', 'property_name=debt_tag')
  }

  create(debt: Object) {
    return this.http.post(this.baseUrl + '/debt',
      JSON.stringify(debt),{ observe: 'response' })
  }

  delete(referenceCode: string) {
    return this.http.delete(this.baseUrl + '/debt?reference_code=' + referenceCode,
      { observe: 'response' })
  }

  private executeGet(url: string, params: string) {
    return this.http.get(url + '?' + params)
  }
}
