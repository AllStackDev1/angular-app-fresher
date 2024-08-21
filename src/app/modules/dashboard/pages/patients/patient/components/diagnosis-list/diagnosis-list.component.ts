import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

import { DiagnosisList } from '@shared/store/models/patient.model';

@Component({
  selector: 'app-diagnosis-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './diagnosis-list.component.html',
})
export class DiagnosisListComponent {
  @Input() diagnosis_list: DiagnosisList[] = []
}
