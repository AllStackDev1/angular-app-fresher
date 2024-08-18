import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService } from '@shared/services/auth/auth.service';
import { AuthActions } from '@shared/store/actions/auth.action';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      mergeMap((data) =>
        this.authService.login(data).pipe(
          map(user => {
            this.router.navigate(['overview']);
            return AuthActions.loginUserSuccess(user)
          }),
          catchError(error => of(AuthActions.loginUserFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutUser),
      mergeMap(() => {
        this.router.navigate(['/']);
        return {} as Observable<any>
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}

