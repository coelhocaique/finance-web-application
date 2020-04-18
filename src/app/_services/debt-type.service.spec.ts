import { TestBed, inject } from '@angular/core/testing';

import { DebtTypeService } from './debt-type.service';

describe('DebtTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebtTypeService]
    });
  });

  it('should be created', inject([DebtTypeService], (service: DebtTypeService) => {
    expect(service).toBeTruthy();
  }));
});
