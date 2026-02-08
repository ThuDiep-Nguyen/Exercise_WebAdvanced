import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50Detail } from './ex50-detail';

describe('Ex50Detail', () => {
  let component: Ex50Detail;
  let fixture: ComponentFixture<Ex50Detail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex50Detail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50Detail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
