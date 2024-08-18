import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { Credential, User } from '@shared/store/models/auth.model';
import { selectUser } from '@shared/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store) {}

  isAuthenticated(): boolean {
    let isTruthy = false
    this.store.select(selectUser).subscribe(user => {
      isTruthy = Boolean(user)
    });

    return isTruthy
  }

  login({ password, username }: Credential ): Observable<User> {
    return of({
      name: 'Dr. Jose Simmons',
      title: 'General Practitioner',
      avater: '/assets/images/doctor.png',
      credential: {
        password,
        username,
      },
    });
  }
}
