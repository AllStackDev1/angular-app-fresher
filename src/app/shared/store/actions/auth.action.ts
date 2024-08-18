import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { Credential, User } from '../models/auth.model';

export const AuthActions = createActionGroup({
  source: '[Auth]',
  events: {
    'Logout User': emptyProps(),
    'Login User': props<Credential>(),
    'Login User Success': props<Readonly<User>>(),
    'Login User Failure': props<{ error: string }>(),
  },
});
