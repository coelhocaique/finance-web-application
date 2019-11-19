import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/_models/user';
import { Observable } from 'rxjs';
import { URL_USER_SERVICE } from 'app/_helpers/constants'

@Injectable()
export class UserService {

    private baseUrl = URL_USER_SERVICE + '/v1/user'

    constructor(private http: HttpClient) { }

    authenticate(user: string, password: string): Observable<User> {
        return this.http.post<User>(this.baseUrl + '/authenticate',
            JSON.stringify({ 'user': user, 'password': password }))
    }

    register(user: User) {
        return this.http.post(this.baseUrl, JSON.stringify(user))
    }
}