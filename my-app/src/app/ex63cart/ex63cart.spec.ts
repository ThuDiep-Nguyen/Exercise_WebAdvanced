import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex63cart } from './ex63cart';

describe('Ex63cart', () => {
  let component: Ex63cart;
  let fixture: ComponentFixture<Ex63cart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex63cart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex63cart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
