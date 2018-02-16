import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorLoginComponent } from './professor-login.component';

describe('ProfessorLoginComponent', () => {
  let component: ProfessorLoginComponent;
  let fixture: ComponentFixture<ProfessorLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
