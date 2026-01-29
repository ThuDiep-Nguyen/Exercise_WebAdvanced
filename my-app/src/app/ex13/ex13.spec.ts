import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EX13 } from './ex13';

describe('EX13', () => {
  let component: EX13;
  let fixture: ComponentFixture<EX13>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EX13]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EX13);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
