import { Injectable } from '@angular/core';

import { authorizationStorageToken } from '../../../../constants/authorization';
import { User } from '../../../../models/user/user.model';

@Injectable()
export class AuthorizationService {

  constructor() { }

  login(user: User): void {
    localStorage.setItem(authorizationStorageToken, `${user.login} ${user.password}`);
  }

  logout(): void {
    localStorage.removeItem(authorizationStorageToken);
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(authorizationStorageToken));
  }

  getUserInfo(): string | null {
    const userInfo: string = localStorage.getItem(authorizationStorageToken);
    return userInfo ? userInfo.split(' ')[0] : userInfo;
  }
}
