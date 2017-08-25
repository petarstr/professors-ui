import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSigninComponent } from './professor-signin.component';

describe('ProfessorSigninComponent', () => {
  let component: ProfessorSigninComponent;
  let fixture: ComponentFixture<ProfessorSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
