import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularSvgIconModule, SvgIconComponent } from 'angular-svg-icon';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { LayoutComponent } from './layout/layout.component';

import {
  MessagePage,
  OverviewPage,
  PatientsLayout,
  PatientPage,
  SchedulePage,
  TransactionsPage,
} from './pages';


@NgModule({
  declarations: [
    MessagePage,
    SchedulePage,
    OverviewPage,
    PatientsLayout,
    LayoutComponent,
    TransactionsPage,
  ],
  imports: [
    NgIf,
    PatientPage,
    CommonModule,
    RouterModule,
    SvgIconComponent,
    AngularSvgIconModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
