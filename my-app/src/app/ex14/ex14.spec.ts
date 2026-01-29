import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EX14 } from './ex14';

describe('EX14', () => {
  let component: EX14;
  let fixture: ComponentFixture<EX14>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EX14]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EX14);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
