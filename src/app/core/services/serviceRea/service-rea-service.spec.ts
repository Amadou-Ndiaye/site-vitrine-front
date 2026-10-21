import { TestBed } from '@angular/core/testing';

import { ServiceREAService } from './service-rea-service';

describe('ServiceREService', () => {
  let service: ServiceREAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceREAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
