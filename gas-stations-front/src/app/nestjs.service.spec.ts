import { TestBed } from '@angular/core/testing';

import { NestjsService } from './nestjs.service';

describe('NestjsService', () => {
  let service: NestjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NestjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
