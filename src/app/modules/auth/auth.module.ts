import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { LoginPage, SignupPage } from './pages';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    LoginPage,
    SignupPage,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    AuthRoutingModule,
    AngularSvgIconModule,
  ]
})
export class AuthModule { }
