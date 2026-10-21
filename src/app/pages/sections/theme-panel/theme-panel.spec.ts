import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePanel } from './theme-panel';

describe('ThemePanel', () => {
  let component: ThemePanel;
  let fixture: ComponentFixture<ThemePanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemePanel],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemePanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
