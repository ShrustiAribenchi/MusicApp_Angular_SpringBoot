import { TestBed } from '@angular/core/testing';

import { NapsterService } from './napster.service';

describe('NapsterService', () => {
  let service: NapsterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NapsterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
