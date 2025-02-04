import { TestBed } from '@angular/core/testing';

import { DocAnalyserApiService } from './doc-analyser-api.service';

describe('DocAnalyserApiService', () => {
  let service: DocAnalyserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocAnalyserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
