import { TestBed, inject } from '@angular/core/testing';

import { CustomAttributeService } from './custom-attribute.service';

describe('CustomAttributeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomAttributeService]
    });
  });

  it('should be created', inject([CustomAttributeService], (service: CustomAttributeService) => {
    expect(service).toBeTruthy();
  }));
});
