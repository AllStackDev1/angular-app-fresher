import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { authReducer } from './shared/store/reducers/auth.reducer';
import { AuthEffects } from './shared/store/effects/auth.effect';

// add this
if (globalThis.window === undefined) {
  globalThis.window = {
    localStorage: () => {},
  } as never;
}

function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    const nextState = reducer(state, action);
    if (window.localStorage.setItem!) {
      localStorage.setItem('tech-care-store', JSON.stringify(nextState));
    }
    return nextState;
  };
}

const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

const getInitialState = () => {
  let initialState = {};

  if (window.localStorage.getItem) {
    initialState = JSON.parse(
      window.localStorage.getItem('tech-care-store') || '{}'
    );
  }

  return initialState;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAngularSvgIcon(),
    provideClientHydration(),
    provideEffects([AuthEffects]),
    provideHttpClient(withFetch()),
    provideStore(
      { auth: authReducer },
      { initialState: getInitialState(), metaReducers }
    ),
    provideCharts(withDefaultRegisterables()),
  ],
};
