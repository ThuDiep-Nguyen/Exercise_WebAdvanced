import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EX18 } from './ex18';

describe('EX18', () => {
  let component: EX18;
  let fixture: ComponentFixture<EX18>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EX18]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EX18);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});