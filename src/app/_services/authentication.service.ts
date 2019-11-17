import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'app/_models/user';

@Injectable()
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private userService: UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('current_user')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    isLoggedIn(){
        let isLoggedIn = localStorage.getItem('is_logged_in')
        return isLoggedIn != null && isLoggedIn == 'true' 
    }
    
    login(user: string, password: string) {
        return this.userService.authenticate(user, password)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('current_user', JSON.stringify(user));
                    localStorage.setItem('is_logged_in', "true");
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('current_user');
        localStorage.removeItem('is_logged_in');
        this.currentUserSubject.next(null);
    }
}