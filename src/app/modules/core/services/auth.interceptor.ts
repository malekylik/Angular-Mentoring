import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { authorizationStorageToken } from '../../../constants/authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem(authorizationStorageToken);
        let authReq: HttpRequest<any> = req;

        if (token) {
            authReq = req.clone({
                headers: req.headers.set('Authorization', token)
            });
        }

        return next.handle(authReq);
    }
}
