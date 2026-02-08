import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50 } from './ex50';

describe('Ex50', () => {
  let component: Ex50;
  let fixture: ComponentFixture<Ex50>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex50]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
