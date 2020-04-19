import { TestBed, inject } from '@angular/core/testing';

import { RecurringDebtService } from './recurring-debt.service';

describe('RecurringDebtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecurringDebtService]
    });
  });

  it('should be created', inject([RecurringDebtService], (service: RecurringDebtService) => {
    expect(service).toBeTruthy();
  }));
});
