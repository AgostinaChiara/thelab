import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['']
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  login() {
    this.router.navigate(['/login'])
  }

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/home']);
  }

  navigateToRecipes() {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/my-recipes'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  navigateHome() {
    this.router.navigate(['/home'])
  }

  getUsername(): string {
    return this.authService.getUsername()
  }
}
