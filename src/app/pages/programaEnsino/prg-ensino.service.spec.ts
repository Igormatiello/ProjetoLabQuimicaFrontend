import { TestBed } from '@angular/core/testing';

import { PrgEnsinoServiceService } from './prg-ensino.service';

describe('PrgEnsinoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrgEnsinoServiceService = TestBed.get(PrgEnsinoServiceService);
    expect(service).toBeTruthy();
  });
});
