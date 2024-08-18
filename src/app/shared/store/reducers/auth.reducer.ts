import { createReducer, on } from '@ngrx/store';

import { Auth } from '../models/auth.model';
import { AuthActions } from '../actions/auth.action';

const initialState: Auth = {
  loading: false,
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginUserSuccess, (state, { type, ...user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(AuthActions.loginUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(AuthActions.logoutUser, () => initialState)
);
