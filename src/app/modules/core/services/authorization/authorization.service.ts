import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { authorizationStorageToken } from '../../../../constants/authorization';
import { User } from '../../../../models/user/user.model';
import { Token } from '../../../../models/token.model';
import { AUTH_URL, USER_INFO_URL } from '../../constants/api';

@Injectable()
export class AuthorizationService {

  private authStatus: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(AUTH_URL, user);
  }

  logout(): void {
    localStorage.removeItem(authorizationStorageToken);
    this.authStatus.next(false);
  }

  storeToken(token: string): void {
    localStorage.setItem(authorizationStorageToken, token);
    this.authStatus.next(true);
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(authorizationStorageToken));
  }

  getUserInfo(): Observable<User> {
    return this.http.post<User>(USER_INFO_URL, null);
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
}
