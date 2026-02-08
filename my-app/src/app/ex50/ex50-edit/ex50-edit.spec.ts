import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50Edit } from './ex50-edit';

describe('Ex50Edit', () => {
  let component: Ex50Edit;
  let fixture: ComponentFixture<Ex50Edit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex50Edit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50Edit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
