import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parameter } from 'app/_models/parameter';
import { URL_GATEWAY } from 'app/_helpers/constants'

@Injectable()
export class DebtThresholdService {

    private baseUrl = URL_GATEWAY + '/debt-threshold'

    constructor(private http: HttpClient) { }
    
    retrieveAll() {
        return this.http.get<Parameter[]>(this.baseUrl)
    }

    create(parameter: Object) {
        return this.http.post(this.baseUrl, JSON.stringify(parameter), { observe: 'response' })
    }

    delete(id: string) {
        return this.http.delete(this.baseUrl + '/' + id, { observe: 'response' })
    }
}