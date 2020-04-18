import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomAttribute } from 'app/_models';
import { URL_GATEWAY } from 'app/_helpers/constants'

@Injectable()
export class DebtTagService {

    private baseUrl = URL_GATEWAY + '/debt-tag'

    constructor(private http: HttpClient) { }

    retrieveAll() {
        return this.http.get<CustomAttribute[]>(this.baseUrl)
    }

    create(tag: string) {
        return this.http.post(this.baseUrl, JSON.stringify({value: tag}), { observe: 'response' })
    }

    delete(id: string) {
        return this.http.delete(this.baseUrl + '/' + id, { observe: 'response' })
    }
}