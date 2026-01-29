import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex27 } from './ex27';

describe('Ex27', () => {
  let component: Ex27;
  let fixture: ComponentFixture<Ex27>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex27]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex27);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
