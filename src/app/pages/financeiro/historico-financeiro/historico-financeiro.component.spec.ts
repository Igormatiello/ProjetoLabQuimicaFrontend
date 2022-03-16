import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFinanceiroComponent } from './historico-financeiro.component';

describe('HistoricoFinanceiroComponent', () => {
  let component: HistoricoFinanceiroComponent;
  let fixture: ComponentFixture<HistoricoFinanceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoFinanceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
