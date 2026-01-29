import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Learndirective } from './learndirective';

describe('Learndirective', () => {
  let component: Learndirective;
  let fixture: ComponentFixture<Learndirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Learndirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Learndirective);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
