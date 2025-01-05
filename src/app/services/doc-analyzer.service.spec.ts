import { TestBed } from '@angular/core/testing';

import { DocAnalyzerService } from './doc-analyzer.service';

describe('DocAnalyzerService', () => {
  let service: DocAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
