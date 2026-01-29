import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ptb1 } from './ptb1';

describe('Ptb1', () => {
  let component: Ptb1;
  let fixture: ComponentFixture<Ptb1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ptb1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ptb1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
