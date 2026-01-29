import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EX10 } from './ex10';

describe('EX10', () => {
  let component: EX10;
  let fixture: ComponentFixture<EX10>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EX10]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EX10);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
