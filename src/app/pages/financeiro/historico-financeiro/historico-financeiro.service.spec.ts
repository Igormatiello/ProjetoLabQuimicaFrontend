import { TestBed } from '@angular/core/testing';

import { HistoricoFinanceiroService } from './historico-financeiro.service';

describe('HistoricoFinanceiroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoricoFinanceiroService = TestBed.get(HistoricoFinanceiroService);
    expect(service).toBeTruthy();
  });
});
