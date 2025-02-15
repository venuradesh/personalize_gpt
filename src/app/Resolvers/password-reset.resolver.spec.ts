import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { passwordResetResolver } from './password-reset.resolver';

describe('passwordResetResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => passwordResetResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
