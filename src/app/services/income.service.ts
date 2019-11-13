import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class IncomeService {

  private baseUrl = 'http://127.0.0.1:8081/v1/income'

  constructor(private http: HttpClient) { 

  }

  getIncomes(year, month){
    if(month == null || month <= 0){
      return this.getByRange(year)
    }

    const reference_date = year.toString() + month.toString().padStart(2, '0')
    return this.executeGet('reference_date='+reference_date)          
  }

  private getByRange(year){

    const dateFrom = year.toString() + "01"
    const dateTo = year.toString() + "12"
    return this.executeGet('date_from=' + dateFrom + '&date_to=' + dateTo)
  }

  private executeGet(params){
    return this.http.get(this.baseUrl + '?' + params, { headers: this.getHeaders()})
  }
  
  create(income: Object){
    return this.http.post(this.baseUrl,
                JSON.stringify(income),
                { headers: this.getHeaders(), observe: 'response'})
  }

  delete(id){
    return this.http.delete(this.baseUrl + '/' + id, 
          { headers: this.getHeaders(), observe: 'response'})
  }

  private getHeaders(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', '44df25d4-08a4-4e3e-9a3b-8b1e39483380');
    return headers
  }

}
