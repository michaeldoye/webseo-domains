import { TestBed, inject } from '@angular/core/testing';

import { WhoisService } from './whois.service';

describe('WhoisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WhoisService]
    });
  });

  it('should be created', inject([WhoisService], (service: WhoisService) => {
    expect(service).toBeTruthy();
  }));
});
