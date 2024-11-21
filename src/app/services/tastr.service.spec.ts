import { TestBed } from '@angular/core/testing';

import { TastrService } from './tastr.service';

describe('TastrService', () => {
  let service: TastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
