import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('current_user'));
        if (currentUser && currentUser.user_id) {
            request = request.clone({headers: request.headers.append('Authorization', `${currentUser.user_id}`)
             });
        }
        return next.handle(request);
    }
}