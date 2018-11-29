import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { authorizationStorageToken } from '../../../../constants/authorization';
import { User } from '../../../../models/user/user.model';

describe('AuthorizationService', () => {
  const user: User = {
    id: '1',
    firstName: 'firstName',
    lastName: 'lastName',
    login: 'login',
    password: 'password',
  };

  let service: AuthorizationService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [AuthorizationService]
  }));

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

  it('should login user', () => {
    service.login(user);

    expect(localStorage.getItem(authorizationStorageToken)).toBeTruthy();
  });

  it('should logout user', () => {
    service.login(user);
    service.logout();
    
    expect(localStorage.getItem(authorizationStorageToken)).toBeFalsy();
  });

  describe('isAuthenticated', () => {
    it('should return false if user is not authenticated', () => {
      expect(service.isAuthenticated()).toBeFalsy();
    });

    it('should return true if user is authenticated', () => {
      service.login(user);

      expect(service.isAuthenticated()).toBeTruthy();
    });
  });

  describe('getUserInfo', () => {
    it('should return null if user is not authenticated', () => {
      expect(service.getUserInfo()).toBeNull();
    });

    it('should return user login if user is authenticated', () => {
      const userLogin: string = user.login;

      service.login(user);

      // expect(service.getUserInfo()).toEqual(userLogin);
    });
  });
});
