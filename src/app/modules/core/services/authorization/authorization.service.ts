import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { authorizationStorageToken } from '../../../../constants/authorization';
import { User } from '../../../../models/user/user.model';
import { Token } from '../../../../models/token.model';
import { AUTH_URL, USER_INFO_URL } from '../../constants/api';

@Injectable()
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(AUTH_URL, user);
  }

  logout(): void {
    localStorage.removeItem(authorizationStorageToken);
  }

  storeToken(token: string): void {
    localStorage.setItem(authorizationStorageToken, token);
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(authorizationStorageToken));
  }

  getUserInfo(): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem(authorizationStorageToken),
      })
    };

    return this.http.post<User>(USER_INFO_URL, null, httpOptions);
  }
}
