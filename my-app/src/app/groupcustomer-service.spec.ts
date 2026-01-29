import { TestBed } from '@angular/core/testing';

import { GroupcustomerService } from './groupcustomer-service';

describe('GroupcustomerService', () => {
  let service: GroupcustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupcustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
