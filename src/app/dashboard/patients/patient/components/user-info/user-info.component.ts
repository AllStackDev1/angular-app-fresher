import { Component, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

import { Patient } from '@shared/store/models/patient.model';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, SvgIconComponent], // to remove CommonModule
  templateUrl: './user-info.component.html',
})
export class UserInfoComponent {
  @Input() patient!: Patient;

  userInfoDetail: {
    id: keyof Patient;
    title: string;
    icon: string;
  }[] = [
    {
      id: 'date_of_birth',
      title: 'Date Of Birth',
      icon: '/assets/icons/calendar.svg',
    },
    {
      id: 'gender',
      title: 'Gender',
      icon: '/assets/icons/female.svg',
    },
    {
      id: 'phone_number',
      title: 'Contact Info',
      icon: '/assets/icons/phone.svg',
    },
    {
      id: 'emergency_contact',
      title: 'Emergency Contacts',
      icon: '/assets/icons/phone.svg',
    },
    {
      id: 'insurance_type',
      title: 'Insurance Provider',
      icon: '/assets/icons/insurance.svg',
    },
  ];
}
