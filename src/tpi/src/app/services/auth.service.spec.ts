import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'token' ? 'mockToken123' : null;
    });
    spyOn(localStorage, 'setItem').and.stub();
    spyOn(localStorage, 'removeItem').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the token correctly', () => {
    const mockToken = 'mockToken123';
    service.setToken(mockToken);
    expect(service.getToken()).toBe(mockToken);
  });

  it('should clear the token correctly', () => {
    service.setToken('mockToken123');
    service.clearToken();
    expect(service.getToken()).toBeNull();
  });

  it('should return true if token is set', () => {
    service.setToken('mockToken123');
    expect(service.isAuthenticatedUser()).toBeTrue();
  });

  it('should return false if token is not set', () => {
    service.clearToken();
    expect(service.isAuthenticatedUser()).toBeFalse();
  });

  it('should decode the token and return the user ID', () => {
    spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue({ id: 123 });
    service.setToken('mock.jwt.token');
    expect(service.getUserId()).toBe(123);
  });

  it('should decode the token and return the username', () => {
    spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue({ username: 'testUser' });
    service.setToken('mock.jwt.token');
    expect(service.getUsername()).toBe('testUser');
  });

  it('should return null if token decoding fails', () => {
    spyOn(JwtHelperService.prototype, 'decodeToken').and.throwError('Invalid token');
    service.setToken('invalid.token');
    expect(service.getUserId()).toBeUndefined();
    expect(service.getUsername()).toBeUndefined();
  });
});
