import { TestBed } from '@angular/core/testing';

import { LoadChatService } from './load-chat.service';

describe('LoadChatService', () => {
  let service: LoadChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
