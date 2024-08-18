import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { SvgIconComponent } from 'angular-svg-icon';

import { DashboardModule } from './dashboard.module';
import { selectUser } from '@shared/store/selectors/auth.selectors';
import { AuthActions } from '@shared/store/actions/auth.action';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    DashboardModule,
    SvgIconComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  user$ = this.store.select(selectUser);
  isMenuOpen = false

  menus = [
    {
      icon: '/assets/icons/home.svg',
      name: 'Overview',
    },
    {
      icon: '/assets/icons/users.svg',
      name: 'Patients',
      isActive: true,
    },
    {
      icon: '/assets/icons/schedule.svg',
      name: 'Schedule',
    },
    { icon: '/assets/icons/chat.svg', name: 'Message' },
    {
      icon: '/assets/icons/credit-card.svg',
      name: 'Transactions',
    },
  ];

  constructor(private store: Store) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    this.store.dispatch(AuthActions.logoutUser());
  }
}
