import { TestBed } from '@angular/core/testing';

import { ApiFinanceService } from './api-finance.service';

describe('ApiFinanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiFinanceService = TestBed.get(ApiFinanceService);
    expect(service).toBeTruthy();
  });
});
