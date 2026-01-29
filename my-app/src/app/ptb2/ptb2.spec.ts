import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ptb2 } from './ptb2';

describe('Ptb2', () => {
  let component: Ptb2;
  let fixture: ComponentFixture<Ptb2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ptb2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ptb2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
