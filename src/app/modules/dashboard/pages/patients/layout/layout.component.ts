import { v4 as uuidv4 } from 'uuid';
import { Router, } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

import { Patient } from '@shared/store/models/patient.model';
import { PatientService } from '@shared/services/patient/patient.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent {
  loading = true;
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
