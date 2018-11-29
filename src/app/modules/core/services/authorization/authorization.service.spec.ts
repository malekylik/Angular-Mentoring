import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthorizationService } from './authorization.service';
import { authorizationStorageToken } from '../../../../constants/authorization';
import { User } from '../../../../models/user/user.model';
import { Token } from '../../../../models/token.model';
import { AUTH_URL, USER_INFO_URL } from '../../constants/api';

describe('AuthorizationService', () => {
  const user: User = {
    id: '1',
    firstName: 'firstName',
    lastName: 'lastName',
    login: 'login',
    password: 'password',
  };
  const token: Token = {
    token: 'token',
  };

  let service: AuthorizationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorizationService]
    });

    service = TestBed.get(AuthorizationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  beforeEach(() => {
    service = TestBed.get(AuthorizationService);
    localStorage.removeItem(authorizationStorageToken);
  });

  afterAll(() => {
    localStorage.removeItem(authorizationStorageToken);
  });

  it('should be created', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    expect(service).toBeTruthy();
  });

  it('login should return an Observable<Token>', () => {
    service.login(user).subscribe((t: Token) => {
      expect(t).toBe(token);
    });

    const req = httpMock.expectOne(AUTH_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(user);
    req.flush(token);
  });

  it('should store token', () => {
    service.storeToken(token.token);

    expect(localStorage.getItem(authorizationStorageToken)).toBeTruthy();
  });

  it('should logout user', () => {
    service.storeToken(token.token);
    service.logout();

    expect(localStorage.getItem(authorizationStorageToken)).toBeFalsy();
  });

  describe('isAuthenticated', () => {
    it('should return false if user is not authenticated', () => {
      expect(service.isAuthenticated()).toBeFalsy();
    });

    it('should return true if user is authenticated', () => {
      service.storeToken(token.token);

      expect(service.isAuthenticated()).toBeTruthy();
    });
  });

  it('getUserInfo should return an Observable<User>', () => {
    service.getUserInfo().subscribe((u: User) => {
      expect(u).toBe(user);
    });

    const req = httpMock.expectOne(USER_INFO_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(null);
    req.flush(user);
  });

  describe('getAuthStatus should return Observable<boolean>', () => {
    it('should be true when login', () => {
      service.getAuthStatus().subscribe((isAuth: boolean) => {
        expect(isAuth).toBeTruthy();
      });

      service.storeToken(token.token);
    });

    it('should be false when logout', () => {
      service.getAuthStatus().subscribe((isAuth: boolean) => {
        expect(isAuth).toBeFalsy();
      });

      service.logout();
    });
  });
});
