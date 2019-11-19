import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parameter } from 'app/_models/parameter';
import { URL_FINANCE_SERVICE } from 'app/_helpers/constants'

@Injectable()
export class ParameterService {

    private baseUrl = URL_FINANCE_SERVICE + '/v1/parameter'

    constructor(private http: HttpClient) { }

    findByName(name: string) {
        return this.http.get<Parameter[]>(this.baseUrl + '?name=' + name)
    }

    find(name: string, year: number, month: number) {
        if (month == null || month <= 0) {
            return this.findByNameAndReferenceDateRange(name, year.toString() + '01', year.toString() + '12')
        }
        let referenceDate = year.toString() + month.toString().padStart(2, '0')
        return this.findByNameAndReferenceDate(name, referenceDate)
    }

    findByNameAndReferenceDate(name: string, referenceDate: string) {
        return this.http.get<Parameter[]>(this.baseUrl + '?name=' + name + '&reference_date=' + referenceDate)
    }

    findByNameAndReferenceDateRange(name: string, fromDate: string, toDate: string) {
        return this.http.get<Parameter[]>(this.baseUrl + '?name=' + name + '&date_from=' + fromDate + '&date_to=' + toDate)
    }

    create(parameter: Object) {
        return this.http.post(this.baseUrl, JSON.stringify(parameter), { observe: 'response' })
    }

    delete(id: string) {
        return this.http.delete(this.baseUrl + '/' + id, { observe: 'response' })
    }
}