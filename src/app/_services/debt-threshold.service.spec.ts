import { TestBed, inject } from '@angular/core/testing';

import { DebtThresholdService } from './debt-threshold.service';

describe('DebtThresholdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebtThresholdService]
    });
  });

  it('should be created', inject([DebtThresholdService], (service: DebtThresholdService) => {
    expect(service).toBeTruthy();
  }));
});
