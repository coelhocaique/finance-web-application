import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DashboardService {

  private baseUrl = 'http://127.0.0.1:8888/v1/dashboard'

  constructor(private http: HttpClient) { }

  getDashboard(dateFrom: Date, dateTo: Date){

    let params = new HttpParams();
    params = params.append('monthFrom', String(dateFrom.getMonth() + 1));
    params = params.append('monthTo', String(dateTo.getMonth() + 1));
    params = params.append('yearFrom', String(dateFrom.getFullYear()));
    params = params.append('yearTo', String(dateTo.getFullYear()))

    return this.http.get(this.baseUrl, {params: params})
  }

}
