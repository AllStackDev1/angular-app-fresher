import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AngularSvgIconModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent {}
