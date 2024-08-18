import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AppGuard } from './app.guard';

describe('AppGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => AppGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
