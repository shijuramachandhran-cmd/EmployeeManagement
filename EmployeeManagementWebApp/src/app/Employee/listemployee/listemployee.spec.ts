import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listemployee } from './listemployee';

describe('Listemployee', () => {
  let component: Listemployee;
  let fixture: ComponentFixture<Listemployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listemployee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listemployee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
