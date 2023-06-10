import { TestBed } from '@angular/core/testing';

import { FrontContentService } from './front-content.service';

describe('FrontContentService', () => {
  let service: FrontContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
