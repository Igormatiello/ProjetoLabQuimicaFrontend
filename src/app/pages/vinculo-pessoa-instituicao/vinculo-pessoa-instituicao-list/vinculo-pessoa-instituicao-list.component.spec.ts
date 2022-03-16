import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VinculoPessoaInstituicaoListComponent } from './vinculo-pessoa-instituicao-list.component';

describe('VinculoPessoaInstituicaoListComponent', () => {
  let component: VinculoPessoaInstituicaoListComponent;
  let fixture: ComponentFixture<VinculoPessoaInstituicaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VinculoPessoaInstituicaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VinculoPessoaInstituicaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
