import { TestBed, inject } from '@angular/core/testing';

import { DebtTagService } from './debt-tag.service';

describe('DebtTagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebtTagService]
    });
  });

  it('should be created', inject([DebtTagService], (service: DebtTagService) => {
    expect(service).toBeTruthy();
  }));
});
