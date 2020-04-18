import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/_models/user';
import { Observable } from 'rxjs';
import { URL_GATEWAY } from 'app/_helpers/constants'

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    authenticate(user: string, password: string): Observable<User> {
        return this.http.post<User>(URL_GATEWAY + '/login',
            JSON.stringify({ 'user': user, 'password': password }))
    }

    register(user: User) {
        return this.http.post(URL_GATEWAY + '/register', JSON.stringify(user))
    }
}