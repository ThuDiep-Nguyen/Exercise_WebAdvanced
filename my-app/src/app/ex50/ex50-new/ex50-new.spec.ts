import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50New } from './ex50-new';

describe('Ex50New', () => {
  let component: Ex50New;
  let fixture: ComponentFixture<Ex50New>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex50New]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50New);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
