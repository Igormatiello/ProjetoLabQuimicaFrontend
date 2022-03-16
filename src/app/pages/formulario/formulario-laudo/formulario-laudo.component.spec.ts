import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioLaudoComponent } from './formulario-laudo.component';

describe('FormularioLaudoComponent', () => {
  let component: FormularioLaudoComponent;
  let fixture: ComponentFixture<FormularioLaudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioLaudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioLaudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
