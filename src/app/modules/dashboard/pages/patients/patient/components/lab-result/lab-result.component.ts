import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-lab-result',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './lab-result.component.html',
})
export class LabResultComponent {
  @Input() results: string[] = [];
}
