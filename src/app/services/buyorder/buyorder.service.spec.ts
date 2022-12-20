import { TestBed } from '@angular/core/testing';

import { BuyorderService } from './buyorder.service';

describe('BuyorderService', () => {
  let service: BuyorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
