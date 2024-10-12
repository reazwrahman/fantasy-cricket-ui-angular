import { TestBed } from '@angular/core/testing';

import { FantasyRankingService } from './fantasy-ranking.service';

describe('FantasyRankingService', () => {
  let service: FantasyRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FantasyRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
