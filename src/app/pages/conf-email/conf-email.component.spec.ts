import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfEmailComponent } from './conf-email.component';

describe('ConfEmailComponent', () => {
  let component: ConfEmailComponent;
  let fixture: ComponentFixture<ConfEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
