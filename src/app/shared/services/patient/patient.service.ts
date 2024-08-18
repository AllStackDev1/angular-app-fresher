import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Patient } from '@shared/store/models/patient.model';
import { selectUser } from '@shared/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private headers:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      }
    | undefined = {};

  constructor(private httpClient: HttpClient, private store: Store) {
    this.store.select(selectUser).subscribe((user) => {
      this.headers = {
        Authorization: 'Basic ' + btoa(user?.credential.username + ':' + user?.credential.password),
      };
    });
  }

  getPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(
      'https://fedskillstest.coalitiontechnologies.workers.dev',
      {
        headers: this.headers,
      }
    );
  }
}
