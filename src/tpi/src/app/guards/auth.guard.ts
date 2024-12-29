import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  const router = new Router();

  if (authService.isAuthenticatedUser()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};