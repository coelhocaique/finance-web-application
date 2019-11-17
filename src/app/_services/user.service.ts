import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/_models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    // private baseUrl = 'http://127.0.0.1:8082/v1/user'

    private baseUrl = 'http://ec2-3-88-43-183.compute-1.amazonaws.com:8082/v1/user'

    constructor(private http: HttpClient) { }

    authenticate(user: string, password: string): Observable<User> {
        return this.http.post<User>(this.baseUrl + '/authenticate', 
                        JSON.stringify({'user': user, 'password':password}))
    }

    register(user: User) {
        return this.http.post(this.baseUrl, JSON.stringify(user))
    }
}