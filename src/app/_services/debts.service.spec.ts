import { TestBed, inject } from '@angular/core/testing';

import { DebtsService } from './debts.service';

describe('DebtsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebtsService]
    });
  });

  it('should be created', inject([DebtsService], (service: DebtsService) => {
    expect(service).toBeTruthy();
  }));
});
