import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex63 } from './ex63';

describe('Ex63', () => {
  let component: Ex63;
  let fixture: ComponentFixture<Ex63>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex63]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex63);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
