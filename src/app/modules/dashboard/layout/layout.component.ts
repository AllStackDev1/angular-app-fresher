import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import { selectUser } from '@shared/store/selectors/auth.selectors';
import { AuthActions } from '@shared/store/actions/auth.action';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  user$ = this.store.select(selectUser);
  isMenuOpen = false;

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
