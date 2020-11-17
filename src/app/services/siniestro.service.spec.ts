import { TestBed } from '@angular/core/testing';

import { SiniestroService } from './siniestro.service';

describe('SiniestroService', () => {
  let service: SiniestroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiniestroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
