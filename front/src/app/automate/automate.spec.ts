import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Automate } from './automate';

describe('Automate', () => {
  let component: Automate;
  let fixture: ComponentFixture<Automate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Automate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Automate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
