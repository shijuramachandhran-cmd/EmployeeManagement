import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listdepartments } from './listdepartments';

describe('Listdepartments', () => {
  let component: Listdepartments;
  let fixture: ComponentFixture<Listdepartments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listdepartments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listdepartments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
