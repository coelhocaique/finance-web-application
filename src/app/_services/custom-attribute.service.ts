import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomAttribute } from 'app/_models';
import { URL_FINANCE_SERVICE } from 'app/_helpers/constants'

@Injectable()
export class CustomAttributeService {

    private baseUrl = URL_FINANCE_SERVICE + '/v1/custom-attribute'

    constructor(private http: HttpClient) { }

    findByPropertyName(propertyName: string) {
        return this.http.get<CustomAttribute[]>(this.baseUrl + '?property_name=' + propertyName)
    }

    create(parameter: Object) {
        return this.http.post(this.baseUrl, JSON.stringify(parameter), { observe: 'response' })
    }

    delete(id: string) {
        return this.http.delete(this.baseUrl + '/' + id, { observe: 'response' })
    }
}