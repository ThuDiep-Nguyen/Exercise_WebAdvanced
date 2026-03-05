import { TestBed } from '@angular/core/testing';

import { DiamondProductsApiService } from './diamond-products-api-service';

describe('DiamondProductsApiService', () => {
  let service: DiamondProductsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiamondProductsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
