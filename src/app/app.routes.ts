import { Routes } from '@angular/router';

import { AppGuard } from './app.guard';

import { NotFoundComponent } from './not-found/not-found.component';
import { LayoutComponent as AuthLayout } from '@Auth/layout/layout.component';
import { LayoutComponent as DashboardLayout } from '@Dashboard/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () => import('@Auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: DashboardLayout,
    canActivate: [AppGuard],
    loadChildren: () => import('@Dashboard/dashboard.module').then((m) => m.DashboardModule),
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
