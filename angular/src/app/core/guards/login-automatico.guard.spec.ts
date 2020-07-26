import { TestBed } from '@angular/core/testing';

import { LoginAutomaticoGuard } from './login-automatico.guard';

describe('LoginAutomaticoGuard', () => {
  let guard: LoginAutomaticoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginAutomaticoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
