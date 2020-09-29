import { TestBed } from '@angular/core/testing';

import { SpringInteractionService } from './spring-interaction.service';

describe('SpringInteractionService', () => {
  let service: SpringInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
