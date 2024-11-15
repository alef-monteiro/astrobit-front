import { TestBed } from '@angular/core/testing';

import { SignupDataService } from './signup-data.service';

describe('SignupDataService', () => {
  let service: SignupDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
