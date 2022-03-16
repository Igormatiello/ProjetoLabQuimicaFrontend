import { TestBed } from '@angular/core/testing';

import { VinculoPessoaInstituicaoService } from './vinculo-pessoa-instituicao.service';

describe('VinculoPessoaInstituicaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VinculoPessoaInstituicaoService = TestBed.get(VinculoPessoaInstituicaoService);
    expect(service).toBeTruthy();
  });
});
