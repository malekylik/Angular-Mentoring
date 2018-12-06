import { TestBed } from '@angular/core/testing';

import { LoadingBlockService } from './loading-block.service';

describe('LoadingBlockService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [LoadingBlockService],
  }));

  it('should be created', () => {
    const service: LoadingBlockService = TestBed.get(LoadingBlockService);
    expect(service).toBeTruthy();
  });
});
