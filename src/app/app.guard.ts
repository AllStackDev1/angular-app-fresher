import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';
import { inject } from '@angular/core';

export const AppGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    return router.createUrlTree(['/auth', 'login']);
  }
};
