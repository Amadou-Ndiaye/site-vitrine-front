import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBox } from './action-box';

describe('ActionBox', () => {
  let component: ActionBox;
  let fixture: ComponentFixture<ActionBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionBox],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
