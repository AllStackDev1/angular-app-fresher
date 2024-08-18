import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import { AuthActions } from '@shared/store/actions/auth.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private store: Store) {}

  onLogin(username: string, password: string) {
    if (username && password) {
      this.store.dispatch(AuthActions.loginUser({ username, password }));
    }
  }
}
