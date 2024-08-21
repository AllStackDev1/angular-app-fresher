import { Component, ViewEncapsulation } from '@angular/core';

import {
  UserInfoComponent,
  LabResultComponent,
  DiagnosisListComponent,
  DiagnosisHistoryComponent,
} from './components';

import { Patient } from '@shared/store/models/patient.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    UserInfoComponent,
    LabResultComponent,
    DiagnosisListComponent,
    DiagnosisHistoryComponent,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PatientComponent {
  patient!: Patient;

  constructor(private router: Router) {}

  ngOnInit() {
    this.patient = history.state;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.patient = history.state;
      }
    });
  }
}
