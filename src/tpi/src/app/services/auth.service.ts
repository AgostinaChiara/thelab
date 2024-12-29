import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  isAuthenticatedUser(): boolean {
    return !!this.token;
  }

  private decodeToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        const jwtHelper = new JwtHelperService();
        return jwtHelper.decodeToken(token)
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null;
  }

  getUserId(): number {
    const decodedToken = this.decodeToken()
    return decodedToken.id
  }

  getUsername(): string {
    const decodedToken = this.decodeToken()
    return decodedToken.username
  }
}