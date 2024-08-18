import { Routes } from '@angular/router';

import { AppGuard } from './app.guard';

import { AuthLayout, Login, Signup } from './auth';
import {
  Messages,
  Overview,
  Patients,
  Schedule,
  Transactions,
  DashboardLayout,
  Patient,
} from './dashboard';

import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login,
        data: { title: 'Auth | Login' },
      },
      {
        path: 'signup',
        component: Signup,
        data: { title: 'Auth | Signup' },
      },
    ],
  },
  {
    path: '',
    component: DashboardLayout,
    canActivate: [AppGuard],
    children: [
      {
        path: 'overview',
        component: Overview,
        data: { title: 'Overview' },
      },
      {
        path: 'patients',
        component: Patients,
        children: [
          {
            path: ':id',
            component: Patient,
            data: { title: 'Patients' },
          },
        ]
      },
      {
        path: 'schedule',
        component: Schedule,
        data: { title: 'Schedule' },
      },
      {
        path: 'message',
        component: Messages,
        data: { title: 'Messages' },
      },
      {
        path: 'transactions',
        component: Transactions,
        data: { title: 'Transactions' },
      },
    ],
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: { title: '404' },
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
