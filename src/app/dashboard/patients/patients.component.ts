import { v4 as uuidv4 } from 'uuid';
import { NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

import { Patient } from '@shared/store/models/patient.model';
import { PatientService } from '@shared/services/patient/patient.service';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterModule, SvgIconComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PatientsComponent {
  loading = false;
  patients: Patient[] = [];

  constructor(
    private router: Router,
    private patientServices: PatientService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.patientServices.getPatients().subscribe((patients) => {
      this.patients = patients.map((p) => ({ ...p, id: uuidv4() }));
      this.loading = false;

      this.router.navigate(['/patients/', this.patients[0].id], {
        state: this.patients[0],
      });
    });
  }
}
