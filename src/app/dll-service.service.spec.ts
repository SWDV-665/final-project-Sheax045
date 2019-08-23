import { TestBed } from '@angular/core/testing';

import { DllServiceService } from './dll-service.service';

describe('DllServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DllServiceService = TestBed.get(DllServiceService);
    expect(service).toBeTruthy();
  });
});
