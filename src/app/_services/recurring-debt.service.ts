import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_GATEWAY } from 'app/_helpers/constants'
import { RecurringDebt, RecurringDebtRetrieval } from 'app/_models/recurring-debt';

@Injectable()
export class RecurringDebtService {

    private baseUrl = URL_GATEWAY + '/recurring-debt'

    constructor(private http: HttpClient) { }

    retrieveCreation(){
        return this.http.get<RecurringDebtRetrieval>(this.baseUrl + '-new')
    }

    retrieveAll() {
        return this.http.get<RecurringDebt[]>(this.baseUrl)
    }

    create(recurringDebt: Object) {
        return this.http.post(this.baseUrl, JSON.stringify(recurringDebt), { observe: 'response' })
    }

    delete(id: string) {
        return this.http.delete(this.baseUrl + '/' + id, { observe: 'response' })
    }
}