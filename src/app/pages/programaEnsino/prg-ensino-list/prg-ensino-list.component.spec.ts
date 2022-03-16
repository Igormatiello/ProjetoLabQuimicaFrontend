import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgEnsinoListComponent } from './prg-ensino-list.component';

describe('PrgEnsinoListComponent', () => {
  let component: PrgEnsinoListComponent;
  let fixture: ComponentFixture<PrgEnsinoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrgEnsinoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgEnsinoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
