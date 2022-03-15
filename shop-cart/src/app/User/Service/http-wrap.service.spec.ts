import { TestBed } from '@angular/core/testing';

import { HttpWrapService } from './http-wrap.service';

describe('HttpWrapService', () => {
  let service: HttpWrapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpWrapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
