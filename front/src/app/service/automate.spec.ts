import { TestBed } from '@angular/core/testing';

import { Automate } from './automate';

describe('Automate', () => {
  let service: Automate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Automate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
