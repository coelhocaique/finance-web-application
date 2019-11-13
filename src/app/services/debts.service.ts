import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DebtsService {

  private baseOldUrl = 'http://127.0.0.1:8888/v1'

  private baseUrl = 'http://127.0.0.1:8081/v1'

  public static monthNames = ["January", "February", "March", "April", "May", "June", "July", 
                              "August", "September", "October", "November", "December"
                              ];
  constructor(private http: HttpClient) { 

  }

  getDebts(year, month){
    if(month == null || month <= 0){
      return this.getByRange(year)
    }

    const reference_date = year.toString() + month.toString().padStart(2, '0')
    return this.executeGet(this.baseUrl + '/debt', 'reference_date='+reference_date)          
  }

  private getByRange(year){

    const dateFrom = year.toString() + "01"
    const dateTo = year.toString() + "12"
    return this.executeGet(this.baseUrl + '/debt', 'date_from=' + dateFrom + '&date_to=' + dateTo)
  }

  getTypes(){
    return this.executeGet(this.baseUrl + '/custom-attribute', 'property_name=debt_type')
  }

  getTags(){
    return this.executeGet(this.baseUrl + '/custom-attribute', 'property_name=debt_tag')
  }

  create(debt: Object){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(this.baseUrl + '/debt',
                JSON.stringify(debt),
                { headers: this.getHeaders(), observe: 'response'})
  }

  delete(referenceCode: string){
    return this.http.delete(this.baseUrl + '/debt?reference_code='+ referenceCode, 
            {headers: this.getHeaders(), observe: 'response'})
  }

  private executeGet(url, params){
    return this.http.get(url + '?' + params, { headers: this.getHeaders()})
  }

  private getHeaders(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', '44df25d4-08a4-4e3e-9a3b-8b1e39483380');
    return headers
  }

}
