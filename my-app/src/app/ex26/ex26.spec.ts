import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EX26 } from './ex26';

describe('EX26', () => {
  let component: EX26;
  let fixture: ComponentFixture<EX26>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EX26]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EX26);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
