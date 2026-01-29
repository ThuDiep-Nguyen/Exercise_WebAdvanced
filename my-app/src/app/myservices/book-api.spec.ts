import { TestBed } from '@angular/core/testing';

import { BookAPI } from './book-api';

describe('BookAPI', () => {
  let service: BookAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
