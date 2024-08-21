import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MessagePage,
  OverviewPage,
  PatientsLayout,
  PatientPage,
  SchedulePage,
  TransactionsPage,
} from './pages';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewPage,
    data: { title: 'Overview' },
  },
  {
    path: 'patients',
    component: PatientsLayout,
    children: [
      {
        path: ':id',
        component: PatientPage,
        data: { title: 'Patients' },
      },
    ],
  },
  {
    path: 'schedule',
    component: SchedulePage,
    data: { title: 'Schedule' },
  },
  {
    path: 'message',
    component: MessagePage,
    data: { title: 'Message' },
  },
  {
    path: 'transactions',
    component: TransactionsPage,
    data: { title: 'Transactions' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
