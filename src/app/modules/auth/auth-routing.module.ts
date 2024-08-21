import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPage, SignupPage } from './pages';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
    data: { title: 'Auth | Login' },
  },
  {
    path: 'signup',
    component: SignupPage,
    data: { title: 'Auth | Signup' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
