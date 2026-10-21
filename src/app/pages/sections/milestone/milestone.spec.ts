import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Milestone } from './milestone';

describe('Milestone', () => {
  let component: Milestone;
  let fixture: ComponentFixture<Milestone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Milestone],
    }).compileComponents();

    fixture = TestBed.createComponent(Milestone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
