import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgEnsinoFormComponent } from './prg-ensino-form.component';

describe('PrgEnsinoFormComponent', () => {
  let component: PrgEnsinoFormComponent;
  let fixture: ComponentFixture<PrgEnsinoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrgEnsinoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgEnsinoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
